from rest_framework import serializers

from .models import Article, Thread
from core.serializers import ArticleUserProfileSerializer

class ListArticleSerializer(serializers.ModelSerializer):
    author = ArticleUserProfileSerializer(read_only=True, many=False)

    class Meta:
        model = Article
        fields = ["title", "content", "date_created", "last_edited", "author"]


class CreateArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["title", "content"]
        

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'
        