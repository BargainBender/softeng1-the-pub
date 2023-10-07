from django.urls import path

from . import views
from core.views import UserProfileDetailAPIView

urlpatterns = [
    path('articles/', views.ArticleListCreateAPIView.as_view()),
    path('<str:username>/', UserProfileDetailAPIView.as_view())
]