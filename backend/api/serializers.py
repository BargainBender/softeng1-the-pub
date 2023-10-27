from rest_framework import serializers

from .models import Article, Thread
from core.serializers import ArticleUserProfileSerializer, ThreadUserProfileSerializer

class ListArticleSerializer(serializers.ModelSerializer):
    author = ArticleUserProfileSerializer(read_only=True, many=False)

    class Meta:
        model = Article
        fields = ["title", "content", "date_created", "last_edited", "author"]


class CreateArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["title", "content"]
 

# TODO: Create serializer that creates a list of authors
# Then instead of threads including the author object,
# it will just reference the id from the list
# authors: [1,2,3,4]
# threads: [ {...author: 1}, {...author: 3}, ...]
class ThreadSerializer(serializers.ModelSerializer):
    author = ArticleUserProfileSerializer(read_only=True, many=False)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ['content', 'date_created', 'last_edited', 'author', 'article', 'children']

    def get_children(self, obj):
        if obj.children.all().exists():
          return ThreadSerializer(obj.children.all(), many=True, context=self.context).data
        return []