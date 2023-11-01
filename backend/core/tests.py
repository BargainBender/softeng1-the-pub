from django.db import transaction
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token


from rest_framework.test import APIClient

from core.models import UserProfile, Follower

from mixer.backend.django import mixer
import pprint as pp

# Create your tests here.

prettyprint = pp.PrettyPrinter(indent=2)
def pprint(object):
    prettyprint.pprint(vars(object))

class UserProfileTest(TestCase):

    def setUp(self):
        self.user = mixer.blend(User)
        self.user.set_password(self.user.password)
        self.userprofile = UserProfile.objects.get(user__pk=self.user.pk)

    def tearDown(self):
        self.user.delete()

    def test_user_profile_created_on_new_user(self):
        assert isinstance(self.userprofile, UserProfile)
        assert self.userprofile == self.user.profile


class TestUserAccountManagementAPIViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "sebastian"
        self.password = "seby123abc"
        self.email = "sebby@test.com"

    def test_user_create_account(self):
        response = self.client.post(reverse("signup"), {
            "username": self.username,
            "password": self.password,
            "confirmed_password": self.password,
            "email": self.email
        }, HTTP_CONTENT_TYPE='application/json')
        
        user = User.objects.get(username=self.username)
        
        assert response.status_code == 201
        assert response.json() is not None
        assert user is not None
        assert check_password(self.password, user.password)
        assert self.email == user.email

    def test_user_login(self):
        User.objects.create_user(
            username=self.username,
            password=self.password,
            email=self.email
        )

        response = self.client.post(reverse("login"), {
            "username": self.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json')

        token = response.data.get("token")

        assert response.status_code == 200
        assert response.json() is not None
        assert token is not None
        assert Token.objects.get(key=token) is not None

    def test_user_logout(self):
        User.objects.create_user(
            username=self.username,
            password=self.password,
            email=self.email
        )

        response = self.client.post(reverse("login"), {
            "username": self.username,
            "password": self.password,
        })

        token = response.data.get("token")

        logout_response = self.client.get(
            reverse("logout"),
            HTTP_AUTHORIZATION="Bearer " + token,
            HTTP_CONTENT_TYPE='application/json')

        message = logout_response.data.get("message")

        assert logout_response.status_code == 200
        assert logout_response.json() is not None
        assert message is not None
        assert message == "Logged out successfully"


class TestProfileAPIViews(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.password = "testabc123"
        self.user1 = mixer.blend(User, password=self.password)
        self.user1.set_password(self.user1.password)
        self.user1.save()


    def get_user1_token(self):
        return self.client.post(reverse("login"), {
            "username": self.user1.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")
    
    def setup_followers(self):
        self.user2 = mixer.blend(User, password=self.password)
        self.user2.set_password(self.user2.password)
        self.user2.save()

        self.user3 = mixer.blend(User, password=self.password)
        self.user3.set_password(self.user2.password)
        self.user3.save()

        user_1_token = self.get_user1_token()

        user_2_token = self.client.post(reverse("login"), {
            "username": self.user2.username,
            "password": self.password,
        }, HTTP_CONTENT_TYPE='application/json').data.get("token")

        # User 1 follows user 3
        self.client.get(
            reverse("follow_user", kwargs={"username": self.user3.username}),
            HTTP_AUTHORIZATION="Bearer " + user_1_token,
            HTTP_CONTENT_TYPE='application/json')
        
        # User 2 follows user 1
        self.client.get(
            reverse("follow_user", kwargs={"username": self.user1.username}),
            HTTP_AUTHORIZATION="Bearer " + user_2_token,
            HTTP_CONTENT_TYPE='application/json')

    def test_followers(self):
        self.setup_followers()
        
        assert len(self.user1.profile.follower.filter(follower__user__username=self.user2.username)) != 0
        assert len(self.user1.profile.following.filter(follower__user__username=self.user1.username)) != 0

    def test_unfollow(self):
        self.setup_followers()
        user_1_token = self.get_user1_token()
        # User 1 unfollows user 3
        self.client.delete(
            reverse("follow_user", kwargs={"username": self.user3.username}),
            HTTP_AUTHORIZATION="Bearer " + user_1_token,
            HTTP_CONTENT_TYPE='application/json')
        
        assert len(self.user1.profile.following.filter(follower__user__username=self.user1.username)) == 0
        assert len(self.user3.profile.follower.filter(follower__user__username=self.user1.username)) == 0

    def test_retrieve_profile(self):
        self.setup_followers()
        response = self.client.get(reverse("user_profile", kwargs={"username": self.user1.username}))

        res_username = response.data.get("username")
        res_name = response.data.get("name")
        res_profile_picture = response.data.get("profile_picture")
        res_is_active = response.data.get("is_active")
        res_followers = response.data.get("followers")
        res_following = response.data.get("following")

        print(response.data)
        
        
        assert response.status_code == 200
        assert response.json() is not None
        assert res_username == self.user1.username
        assert res_name == self.user1.profile.name
        assert res_profile_picture == self.user1.profile.profile_picture
        assert res_is_active == self.user1.profile.is_active
        assert self.user2.username in res_followers
        assert self.user3.username in res_following

    def test_edit_profile(self):
        new_profile_picture = "https://api.dicebear.com/7.x/notionists-neutral/svg?seed=123XYZ"
        new_is_active = False

        response = self.client.put(
            reverse("profile_settings"),
            {
                "is_active": new_is_active,
                "profile_picture": new_profile_picture
            },
            HTTP_AUTHORIZATION="Bearer " + self.get_user1_token(),
            HTTP_CONTENT_TYPE='application/json')
        
        assert response.status_code == 200
        assert response.json() is not None
        assert response.data.get("is_active") == new_is_active
        assert response.data.get("profile_picture") == new_profile_picture

    def test_change_password(self):
        new_password = "YNpp05x8cIgG"
        response = self.client.put(
            reverse("change_password"),
            {
                "current_password": self.password,
                "new_password": new_password,
                "confirmed_new_password": new_password
            },
            HTTP_AUTHORIZATION="Bearer " + self.get_user1_token(),
            HTTP_CONTENT_TYPE='application/json')

        user = User.objects.get(username=self.user1.username)

        login_response = self.client.post(reverse("login"), {
            "username": user.username,
            "password": new_password,
        }, HTTP_CONTENT_TYPE='application/json')

        token = login_response.data.get("token")

        assert response.status_code == 200
        assert response.json() is not None
        assert response.data.get("message") == "Changed password successfully"
        assert check_password(new_password, user.password)
        assert login_response.status_code == 200
        assert login_response.json() is not None
        assert token is not None
        assert Token.objects.get(key=token) is not None