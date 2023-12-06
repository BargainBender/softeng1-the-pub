from django.shortcuts import get_object_or_404
from django.http import Http404
from django.db import IntegrityError
from django.contrib.auth import logout
from django.contrib.auth.models import User

from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

from api.authentication import TokenAuthentication

from .models import UserProfile, Follower
from api.models import ProfileTag, Tag
from .permissions import EditProfilePermission
from . import serializers

import logging
logger = logging.getLogger(__name__)

# Create your views here.

class UserProfileDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, EditProfilePermission]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    queryset = UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
    lookup_field = 'username'
    
    def get_object(self):
        # Get the User object using the username from the URL
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        # Get the UserProfile object related to the User
        return get_object_or_404(UserProfile, user=user)
    
class UserProfileSettingsAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, EditProfilePermission]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    queryset = UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
    lookup_field = 'username'
    
    def get_object(self):
        return self.request.user.profile
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        
        logger.info("working")

        # Handle the tags directly in the view
        if "preferred_tags" in data:
            new_tags = data.get('preferred_tags', [])

            # Validate that 'tags' is an array
            if not isinstance(new_tags, list):
                raise ValidationError({'tags': ['Preferred tags must be an array.']})

            # Delete existing profile tags for the user profile
            ProfileTag.objects.filter(profile=instance).delete()

            # Create new profile tags for the user profile
            # TODO: Instead of auto creating in profile, validation
            # should just allow existing tags.
            for tag_name in new_tags:
                tag_obj, created = Tag.objects.get_or_create(tag=tag_name)
                ProfileTag.objects.create(profile=instance, tag=tag_obj)

        # Update the other fields using the serializer
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailsSerializer

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.CreateUserSerializer

class UserAccountSettingsAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    def get_object(self):
        return self.request.user
    
class ChangeUserPasswordAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.ChangeUserPasswordSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response({"message": "Changed password successfully"}, status=status.HTTP_200_OK)

class LogoutAPIView(APIView):
    queryset = Token.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]

    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class FollowAPIView(APIView):
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    lookup_field = "username"
    
    def get(self, request, username):
        try:
            user_to_follow = get_object_or_404(User, username=username)
            user_profile_to_follow = get_object_or_404(UserProfile, user=user_to_follow)
            Follower.objects.create(follower=request.user.profile, following=user_profile_to_follow)
        except IntegrityError:
            return Response({"error": "You are already following this user"}, status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response({"error": f"User '{username}' not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": f"Followed {username}"}, status=status.HTTP_200_OK)
    
    def delete(self, request, username):
        try:
            user_to_unfollow = get_object_or_404(User, username=username)
            user_profile_to_unfollow = get_object_or_404(UserProfile, user=user_to_unfollow)
            following = Follower.objects.get(follower=request.user.profile, following=user_profile_to_unfollow)
            following.delete()
        except IntegrityError:
            return Response({"error": "You are not following this user"}, status=status.HTTP_400_BAD_REQUEST)
        except Http404:
            return Response({"error": f"User '{username}' not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": f"Unfollowed {username}"}, status=status.HTTP_200_OK)