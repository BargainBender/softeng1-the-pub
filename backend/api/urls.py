from django.urls import path

from . import views
from core.views import UserProfileDetailAPIView, UserListAPIView, FollowAPIView

urlpatterns = [
    
    path('articles/', views.ArticleListView.as_view(), name="all_articles"),
    path('threads/', views.ThreadListCreateAPIView.as_view(), name="all_threads"),
    path('users/', UserListAPIView.as_view(), name="all_users"), # TODO: Remove in the future, only for development
    path('votes/', views.ArticleVoteListAPIView.as_view(), name="create_article_vote"),
    path('follow/<str:username>/', FollowAPIView.as_view(), name="follow_user"),
    path('<str:username>/', UserProfileDetailAPIView.as_view(), name="user_profile"),
    path('<str:username>/articles/', views.UserArticleListCreateView.as_view(), name='user_articles'),
    path('<str:username>/<int:pk>-<str:title>/', views.ArticleRetrieveUpdateDestroyAPIView.as_view(), name="article"),
    path('<str:username>/<int:pk>-<str:title>/vote/', views.ArticleVoteView.as_view(), name="article_vote"),
]