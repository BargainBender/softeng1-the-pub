from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import StaticHTMLRenderer

from django.shortcuts import render, get_object_or_404

from .models import Article, Thread
from .serializers import ListArticleSerializer, CreateArticleSerializer, ListThreadSerializer, CreateThreadSerializer, ArticleSerializer
from .permissions import IsOwnerOrReadOnly
from .authentication import TokenAuthentication

from core.models import UserProfile
from core.serializers import ArticleUserProfileSerializer
# Create your views here.

class ArticleListView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ListArticleSerializer

class UserArticleListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        username = self.kwargs.get('username')
        return Article.objects.filter(author__user__username=username)

    def perform_create(self, serializer):
        # Get UserProfile from User
        user_profile = self.request.user.profile
        serializer.save(author=user_profile)
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return ListArticleSerializer
        elif self.request.method == "POST":
            return CreateArticleSerializer

class ArticleRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    
    def get_object(self):
        article = get_object_or_404(Article, pk=self.kwargs.get('pk'), title=self.kwargs.get('title'))

        return article


class ThreadListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ListThreadSerializer
        elif self.request.method == "POST":
            return CreateThreadSerializer
    
    # TODO: Needs Optimization
    def get_all_authors(self, thread):
        authors = [thread.author.user.id]
        for child in thread.children.all():
            authors.extend(self.get_all_authors(child))
        return authors

    # TODO: Needs Optimization
    def get(self, request):
        threads = Thread.objects.filter(parent__isnull=True)
        authors = set()
        for thread in threads:
            authors.update(self.get_all_authors(thread))
        authors = UserProfile.objects.filter(user__id__in=authors)

        author_serializer = ArticleUserProfileSerializer(authors, many=True)
        author_data = {
            author['id']: author for author in author_serializer.data
        }

        thread_serializer = ListThreadSerializer(threads, many=True)
        thread_data = thread_serializer.data
        for author in author_data:
            del author_data[author]['id']

        return Response({
            "authors": author_data,
            "threads": thread_data
        })

    def perform_create(self, serializer):
        # Get UserProfile from User
        user_profile = self.request.user.profile
        serializer.save(author=user_profile)


@api_view(['GET'])
@renderer_classes([StaticHTMLRenderer])
@permission_classes([permissions.IsAuthenticated])
def simple_html_view(request):
    data = '<html><body><h1>This page is secured</h1></body></html>'
    return Response(data)