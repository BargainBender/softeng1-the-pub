from .models import UserProfile, Follower
from rest_framework import serializers

class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ["follower"]

class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = ["following"]


class ArticleUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["username", "name", "profile_picture", "is_active"]



class UserProfileSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ["username", "name", "profile_picture", "is_active", "followers", "following"]

    def get_followers(self, obj):
        followers = obj.followers.filter(following=obj)
        follower_list = []
        for follower_data in followers:
            follower_list.append(follower_data.follower.user.username)
            # if user_profile.following == obj:
            #     follower_data.append({
            #     "follower": {
            #         "username": user_profile.follower.user.username,
            #         "name": user_profile.follower.user.first_name + " " + user_profile.follower.user.last_name,
            #         "profile_picture": user_profile.follower.profile_picture,
            #         "is_active": user_profile.follower.is_active,
            #     },
            #     "created": user_profile.created
            # })
        return follower_list

    def get_following(self, obj):
        following = obj.following.filter(follower=obj)
        following_list = []
        for following_data in following:
            following_list.append(following_data.following.user.username)
        return following_list