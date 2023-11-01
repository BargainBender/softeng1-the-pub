from django.urls import path

from . import views
from core.views import UserProfileDetailUpdateAPIView, UserListAPIView, FollowAPIView

urlpatterns = [
    
    path('articles/', views.ArticleListView.as_view(), name="all_articles"),
    path('threads/', views.ThreadListCreateAPIView.as_view(), name="all_threads"),
    path('users/', UserListAPIView.as_view(), name="all_users"), # TODO: Remove in the future, only for development
    path('follow/<str:username>/', FollowAPIView.as_view(), name="follow_user"),
    path('<str:username>/', UserProfileDetailUpdateAPIView.as_view(), name="user_profile"),
    path('<str:username>/articles/', views.UserArticleListCreateView.as_view(), name='user_articles'),
    path('<str:username>/<int:pk>-<str:title>/', views.ArticleRetrieveUpdateDestroyAPIView.as_view(), name="article"),
]