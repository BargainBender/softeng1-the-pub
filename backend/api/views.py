from rest_framework import authentication, generics, mixins, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import StaticHTMLRenderer

from django.shortcuts import render

from .models import Article, Thread
from .serializers import ListArticleSerializer, CreateArticleSerializer, ThreadSerializer
from .permissions import IsStaffEditorPermission
from .authentication import TokenAuthentication

# Create your views here.

class ArticleListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    queryset = Article.objects.all()

    def perform_create(self, serializer):
        # Get UserProfile from User
        user_profile = self.request.user.profile
        serializer.save(author=user_profile)
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return ListArticleSerializer
        elif self.request.method == "POST":
            return CreateArticleSerializer


class ThreadListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    
    def get_queryset(self):
      return Thread.objects.filter(parent__isnull=True)


@api_view(['GET'])
@renderer_classes([StaticHTMLRenderer])
@permission_classes([permissions.IsAuthenticated])
def simple_html_view(request):
    data = '<html><body><h1>This page is secured</h1></body></html>'
    return Response(data)