import pytest
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from .models import Article
from core.models import UserProfile

from mixer.backend.django import mixer

from rest_framework.test import APIClient

# Create your tests here.

class TestArticleAPIViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = "testabc123"
        self.user1 = mixer.blend(User, password=self.password)
        self.user1.set_password(self.user1.password)
        self.user1.save()
        self.token1 = self.client.post(reverse("login"), {
            "username": self.user1.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")


    def create_more_users(self):
        self.user2 = mixer.blend(User, password=self.password)
        self.user2.set_password(self.user2.password)
        self.user2.save()
        self.token2 = self.client.post(reverse("login"), {
            "username": self.user2.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")



    def test_create_empty_article(self):
        response = self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {

        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)

        assert response.status_code == 201
        assert response.json() is not None
        assert response.data.get("title") == "Untitled"
        assert response.data.get("content") == ""


    def test_create_article(self):
        title = "Some title"
        content = "Some content"
        response = self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title,
            "content": content,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)

        assert response.status_code == 201
        assert response.json() is not None
        assert response.data.get("title") == title
        assert response.data.get("content") == content
        assert len(Article.objects.filter(title=title, author=self.user1.profile)) == 1


    @pytest.mark.retrieve_articles
    def test_retrieve_user_articles(self):
        self.create_more_users()

        title1 = f"{self.user1.username}'s article 1"
        title2 = f"{self.user1.username}'s article 2"
        title3 = f"{self.user2.username}'s article 1"
        title4 = f"{self.user2.username}'s article 2"

        content1 = "Some content 1"
        content2 = "Some content 2"
        content3 = "Some content 3"
        content4 = "Some content 4"

        self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title1,
            "content": content1,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)

        self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title2,
            "content": content2,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)

        self.client.post(reverse("user_articles", kwargs={ "username": self.user2.username }), {
            "title": title3,
            "content": content3,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token2)

        self.client.post(reverse("user_articles", kwargs={ "username": self.user2.username }), {
            "title": title4,
            "content": content4,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token2)

        response1 = self.client.get(
            reverse("user_articles", kwargs={ "username": self.user1.username }), 
            HTTP_CONTENT_TYPE='application/json'
        )

        response2 = self.client.get(
            reverse("user_articles", kwargs={ "username": self.user2.username }), 
            HTTP_CONTENT_TYPE='application/json'
        )

        assert response1.status_code == 200
        assert response2.status_code == 200
        assert response1.data is not None
        assert response2.data is not None
        assert response1.data[0]['title'] == title1
        assert response1.data[1]['title'] == title2
        assert response2.data[0]['title'] == title3
        assert response2.data[1]['title'] == title4
        

    @pytest.mark.get_specific_article
    def test_retrieve_specific_article(self):
        title1 = f"{self.user1.username}'s article 1"
        content1 = "Some content 1"
        response = self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title1,
            "content": content1,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)
        article_url = response.data.get("url")

        article_response = self.client.get(article_url)
        res_title = article_response.data.get("title")
        res_content = article_response.data.get("content")
        res_author_username = article_response.data.get("author")["username"]
        
        assert article_response.status_code == 200
        assert article_response.json() is not None
        assert res_title == title1
        assert content1 == res_content
        assert res_author_username == self.user1.username

    
    @pytest.mark.delete_specific_article
    def test_delete_specific_article(self):
        title1 = f"{self.user1.username}'s article 1"
        content1 = "Some content 1"
        response = self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title1,
            "content": content1,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)
        
        article_url = response.data.get("url")
        
        delete_response = self.client.delete(article_url,
            HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1
        )

        article_response = self.client.get(article_url)

        assert delete_response.status_code == 204
        assert article_response.status_code == 404

    
    @pytest.mark.article_content_preview
    def test_article_content_preview(self):
        title1 = f"{self.user1.username}'s article 1"
        content1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        title2 = f"{self.user1.username}'s article 2"
        content2 = "Some content 2"

        self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title1,
            "content": content1,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)

        self.client.post(reverse("user_articles", kwargs={ "username": self.user1.username }), {
            "title": title2,
            "content": content2,
        }, HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1)
        
        response1 = self.client.get(
            reverse("user_articles", kwargs={ "username": self.user1.username }),
            HTTP_CONTENT_TYPE='application/json', HTTP_AUTHORIZATION="Bearer " + self.token1
        )

        assert response1.status_code == 200
        assert response1.json() is not None
        assert len(response1.data[0]["content_preview"]) == 203
        assert len(response1.data[1]["content_preview"]) == len(content2)


class TestThreadAPIViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = "testabc123"
        self.user1 = mixer.blend(User, password=self.password)
        self.user1.set_password(self.user1.password)
        self.user1.save()
        self.token1 = self.client.post(reverse("login"), {
            "username": self.user1.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")


    def create_more_users(self):
        self.user2 = mixer.blend(User, password=self.password)
        self.user2.set_password(self.user2.password)
        self.user2.save()
        self.token2 = self.client.post(reverse("login"), {
            "username": self.user2.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")