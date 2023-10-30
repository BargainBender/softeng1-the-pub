from django.urls import path

from . import views
from core.views import UserProfileDetailUpdateAPIView, UserListAPIView, FollowAPIView

urlpatterns = [
    
    path('articles/', views.ArticleListCreateView.as_view()),
    path('threads/', views.ThreadListCreateAPIView.as_view()),
    path('users/', UserListAPIView.as_view()), # TODO: Remove in the future, only for development
    path('follow/<str:username>/', FollowAPIView.as_view()),
    path('<str:username>/', UserProfileDetailUpdateAPIView.as_view()),
]