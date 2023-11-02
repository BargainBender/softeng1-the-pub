from rest_framework import serializers

from django.urls import reverse

from .models import Article, Thread, ArticleThread
from core.serializers import ArticleUserProfileSerializer
# import logging
# logger = logging.getLogger(__name__)
class ListArticleSerializer(serializers.ModelSerializer):
    author = ArticleUserProfileSerializer(read_only=True, many=False)
    content_preview = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ["id", "title", "content_preview", "date_created", "last_edited", "author", "url"]
        
    def get_content_preview(self, obj):
        # Limit the content to a certain number of characters for the preview
        max_length = 200
        if len(obj.content) > max_length:
            return obj.content[:max_length] + '...'
        return obj.content

    def get_url(self, obj):
        return reverse('article', kwargs={'username': obj.author.user.username, 'pk': obj.id, 'title': obj.title})
    
class ArticleSerializer(serializers.ModelSerializer):
    author = ArticleUserProfileSerializer(read_only=True, many=False)
    class Meta:
        model = Article
        fields = ["id", "title", "content", "date_created", "last_edited", "author"]

class CreateArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "content"]


class ListThreadSerializer(serializers.ModelSerializer):
    # author = ArticleUserProfileSerializer(read_only=True, many=False)
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ['id', 'content', 'date_created', 'last_edited', 'author', 'parent', 'children']

    def get_children(self, obj):
        if obj.children.all().exists():
          return ListThreadSerializer(obj.children.all(), many=True, context=self.context).data
        return []
    
class CreateThreadSerializer(serializers.ModelSerializer):
    article = serializers.PrimaryKeyRelatedField(required=False, allow_null=True, queryset=Article.objects.all())
    class Meta:
        model = Thread
        fields = ['content', 'date_created', 'last_edited', 'parent', 'article']

    def validate_parent(self, parent_thread):
        # Define your maximum depth limit here
        max_depth = 2  # Change this to your desired limit, starts from 0

        # Function to calculate the depth of a thread recursively
        def calculate_depth(thread, depth=0):
            if thread.parent:
                return calculate_depth(thread.parent, depth + 1)
            return depth

        if parent_thread:
            depth = calculate_depth(parent_thread)
            if depth >= max_depth:
                raise serializers.ValidationError("Thread depth exceeds the maximum limit.")
        return parent_thread

    def validate(self, data):
        parent_thread = data.get('parent', None)
        self.validate_parent(parent_thread)
        return data
    
    def create(self, validated_data):
        article = validated_data.pop('article', None)
        thread = Thread(**validated_data)
        
        if article:
            if thread.parent:
                raise serializers.ValidationError({
                    "error": "Article and parent are mutually exclusive"
                })

            # If an article is provided, associate the thread with it
            try:
                Article.objects.get(pk=article.id)
                thread.save()
                ArticleThread.objects.create(article=article, thread=thread)
                return thread
            except Article.DoesNotExist as e:
                raise serializers.ValidationError(e)
        
        thread.save()
        return thread