from django.contrib import admin
from .models import UserProfile, Follower
from api.models import Article

# Register your models here.

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
  list_display = ('user', 'profile_picture', 'is_active')
  inlines = [ArticleInline, FollowerInline, FollowingInlline]

@admin.register(Follower)
class FollowModelAdmin(admin.ModelAdmin):
  list_display = ('following', 'follower', 'created')