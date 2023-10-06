from django.urls import include, path

from . import views

urlpatterns = [
    path('articles/', include('articles.urls')),
]