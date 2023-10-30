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
 

class ListThreadSerializer(serializers.ModelSerializer):
    # author = ArticleUserProfileSerializer(read_only=True, many=False)
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ['content', 'date_created', 'last_edited', 'author', 'article', 'parent', 'children']

    def get_children(self, obj):
        if obj.children.all().exists():
          return ListThreadSerializer(obj.children.all(), many=True, context=self.context).data
        return []
    
class CreateThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ['content', 'date_created', 'last_edited', 'article', 'parent']

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