from django.urls import path

from . import views
from core.views import UserProfileDetailUpdateAPIView, UserListAPIView

urlpatterns = [
    
    path('articles/', views.ArticleListCreateView.as_view()),
    path('threads/', views.ThreadListCreateAPIView.as_view()),
    path('users/', UserListAPIView.as_view()), # TODO: Remove in the future, only for development
    path('<str:username>/', UserProfileDetailUpdateAPIView.as_view()),
]