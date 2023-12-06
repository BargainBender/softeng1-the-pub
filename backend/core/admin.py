from django.contrib import admin
from .models import UserProfile, Follower
from api.models import Article, ProfileTag

# Register your models here.
class ProfileTagInline(admin.TabularInline):
    model = ProfileTag
    extra = 1
class ArticleInline(admin.StackedInline):
  model = Article
  extra = 0

class FollowerInline(admin.TabularInline):
  model = Follower
  fk_name = "follower"
  extra = 0

class FollowingInlline(admin.TabularInline):
  model = Follower
  fk_name = "following"
  extra = 0

@admin.register(UserProfile)
class UserProfileModelAdmin(admin.ModelAdmin):
  list_display = ('user', 'profile_picture', 'is_active', "display_tags")
  
  def display_tags(self, obj):
    return ', '.join([str(tag.tag) for tag in obj.preferred_tags.all()])

  display_tags.short_description = 'Preferred tags'
  
  inlines = [ArticleInline, FollowerInline, FollowingInlline, ProfileTagInline]

@admin.register(ProfileTag)
class ProfileTagModelAdmin(admin.ModelAdmin):
    list_display = ("profile", "tag")

@admin.register(Follower)
class FollowModelAdmin(admin.ModelAdmin):
  list_display = ('follower', 'following', 'created')