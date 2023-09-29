from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=70)
    content = models.TextField(blank=True)
    date_created = models.DateField(auto_now=True)
    last_edited = models.DateField(auto_now=True)
