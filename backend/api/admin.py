from django.contrib import admin
from .models import Article, Thread, ArticleThread, Tag, ArticleTag
# Register your models here.

class ArticleTagInline(admin.TabularInline):
    model = ArticleTag
    extra = 1

@admin.register(Article)
class ArticleModelAdmin(admin.ModelAdmin):
    inlines = [ArticleTagInline]
    list_display = ("title", "content", "author", "date_created", "last_edited", "display_tags")
  
    def display_tags(self, obj):
        return ', '.join([str(tag.tag) for tag in obj.tags.all()])

    display_tags.short_description = 'Tags'

    def get_inline_instances(self, request, obj=None):
        if obj:
            return [inline(self.model, self.admin_site) for inline in self.inlines]
        return []

@admin.register(Thread)
class ThreadModelAdmin(admin.ModelAdmin):
    list_display = ("content_substr", "author", "date_created", "last_edited")
  
    def content_substr(self, obj):
        if len(obj.content) > 40:
            return obj.content[0:250].strip() + "..."
        return obj.content
  
    content_substr.short_description = "content"


@admin.register(ArticleTag)
class ArticleTagModelAdmin(admin.ModelAdmin):
    list_display = ("article", "tag")

@admin.register(ArticleThread)
class ArticleThreadModelAdmin(admin.ModelAdmin):
    list_display = ("article", "thread")
    
@admin.register(Tag)
class TagModelAdmin(admin.ModelAdmin):
    list_display = ["tag"]
    