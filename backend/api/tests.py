from django.test import TestCase
from .models import Article
from core.models import UserProfile
from django.contrib.auth.models import User
from mixer.backend.django import mixer

# Create your tests here.

class TestArticleModel(TestCase):
    def setUp(self):
        self.user = mixer.blend(User)
        self.user.save()
        self.userprofile = UserProfile.objects.get(user__pk=self.user.pk)

    def test_create_article_from_user(self):
        self.userprofile.articles
        self.assertTrue(True)
