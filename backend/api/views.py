from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from rest_framework.renderers import StaticHTMLRenderer

from django.shortcuts import render, get_object_or_404
from django.db import IntegrityError
from django.http import Http404

from .models import Article, Thread, ArticleVote
from .serializers import ListArticleSerializer, CreateArticleSerializer, ListThreadSerializer, CreateThreadSerializer, ArticleSerializer
from . import serializers
from .permissions import IsOwnerOrReadOnly
from .authentication import TokenAuthentication

from core.models import UserProfile
from core.serializers import ArticleUserProfileSerializer

import json
import logging
logger = logging.getLogger(__name__)
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
        

class ArticleVoteListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    queryset = ArticleVote.objects.all()
    serializer_class = serializers.ArticleListVoteSerializer
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return serializers.ArticleListVoteSerializer
        elif self.request.method == "POST":
            return serializers.ArticleVoteSerializer

class ArticleVoteView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    serializer_class = serializers.ArticleVoteSerializer

    def get_object(self, voter, article):
        try:
            vote = ArticleVote.objects.get(voter=voter, article=article)
            return vote
        except ArticleVote.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        # Handle both creation and update for voting
        voter = request.user.profile
        article = get_object_or_404(Article, pk=kwargs.get('pk'), title=kwargs.get('title'))
        article_vote = self.get_object(voter=voter, article=article)
        
        is_upvote = True if request.data.get("is_upvote") is None else request.data.get("is_upvote")
        if article_vote is None:
            logger.info("create vote")
            ArticleVote.objects.create(voter=voter, article=article, is_upvote=is_upvote)
        else:
            logger.info("update vote")
            article_vote.is_upvote = is_upvote
            article_vote.save()
        return Response({"message": "Upvoted" if is_upvote else "Downvoted"}, status=status.HTTP_201_CREATED if article_vote is None else status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        # Delete the vote for the specified article
        voter = request.user.profile
        article = get_object_or_404(Article, pk=kwargs.get('pk'), title=kwargs.get('title'))
        article_vote = self.get_object(voter=voter, article=article)

        if article_vote is not None:
            article_vote.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response({'detail': 'Vote not found.'}, status=status.HTTP_404_NOT_FOUND)