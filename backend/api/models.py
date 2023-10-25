from collections.abc import Iterable
from django.db import models
from django.contrib.auth.models import User
from core.models import UserProfile

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=70, default="Untitled")
    content = models.TextField(blank=True)
    date_created = models.DateField(auto_now=True)
    last_edited = models.DateField(auto_now=True)
    author = models.ForeignKey(UserProfile, blank=False, on_delete=models.CASCADE, related_name="articles")

    def __str__(self):
        return self.title
    
    
class Thread(models.Model):
    content = models.TextField(blank=True)
    date_created = models.DateField(auto_now=True)
    last_edited = models.DateField(auto_now=True)
    author = models.ForeignKey(UserProfile, blank=False, on_delete=models.CASCADE, related_name="threads")
    depth = models.IntegerField()
    parent = models.ForeignKey(to='Thread', blank=True, null=True, on_delete=models.CASCADE, related_name="children")