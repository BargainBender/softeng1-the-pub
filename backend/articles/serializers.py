from rest_framework import serializers

from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = [
            'title',
            'content',
            'date_created',
            'last_edited',
        ]