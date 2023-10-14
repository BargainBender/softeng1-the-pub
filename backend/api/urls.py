from django.urls import path

from . import views
from core.views import UserProfileDetailUpdateAPIView, UserListCreateAPIView, UserSettingsAPIView

urlpatterns = [
    
    path('articles/', views.ArticleListCreateView.as_view()),
    path('settings/', UserSettingsAPIView.as_view()),
    path('user/<str:username>/', UserProfileDetailUpdateAPIView.as_view()),
    path('users/', UserListCreateAPIView.as_view()),
]