from .models import UserProfile, Follower
from django.contrib.auth.models import User
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
    
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirmed_password = serializers.CharField(required=True, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ["username", "password", "confirmed_password", "first_name", "last_name", "email"]

    def create(self, validated_data):
      confirmed_password = validated_data.pop('confirmed_password')
      if validated_data.get('password') != confirmed_password:
          raise serializers.ValidationError("Passwords do not match")
      return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
      confirmed_password = validated_data.pop('confirmed_password')
      if validated_data.get('password') != confirmed_password:
          raise serializers.ValidationError("Passwords do not match")
      instance.set_password(validated_data.pop('password'))
      return super().update(instance, validated_data)