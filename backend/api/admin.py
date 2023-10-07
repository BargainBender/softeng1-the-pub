from django.contrib import admin
from .models import Article
# Register your models here.

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
  list_display = ("title", "content", "author", "date_created", "last_edited")