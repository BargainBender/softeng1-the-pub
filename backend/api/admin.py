from django.contrib import admin
from .models import Article, Thread
# Register your models here.

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
  list_display = ("title", "content", "author", "date_created", "last_edited")

@admin.register(Thread)
class ThreadModelAdmin(admin.ModelAdmin):
  list_display = ("content_substr", "author", "date_created", "last_edited")
  
  def content_substr(self, obj):
    if len(obj.content) > 40:
        return obj.content[0:250].strip() + "..."
    return obj.content
  
  content_substr.short_description = "content"