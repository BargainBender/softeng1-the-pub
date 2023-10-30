from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from django.contrib.auth import logout
from django.contrib.auth.models import User

from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.authentication import TokenAuthentication

from .models import UserProfile, Follower
from .permissions import EditProfilePermission
from . import serializers

# import logging
# logger = logging.getLogger(__name__)

# Create your views here.

class UserProfileDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
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

# class UserListCreateAPIView(generics.ListCreateAPIView):
#     queryset = User.objects.all()

#     def get_serializer_class(self):
#       if self.request.method == "GET":
#           return UserDetailsSerializer
#       elif self.request.method == "POST":
#           return CreateUserSerializer

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserDetailsSerializer

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.CreateUserSerializer

class UserSettingsRetrieveAPIView(generics.RetrieveAPIView):
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
        user_to_follow = get_object_or_404(User, username=username)
        user_profile_to_follow = get_object_or_404(UserProfile, user=user_to_follow)
        try:
            Follower.objects.create(follower=request.user.profile, following=user_profile_to_follow)
        except IntegrityError:
            return Response({"error": "You are already following this user"}, status=status.HTTP_200_OK)
        return Response({"message": f"Followed {username}"}, status=status.HTTP_200_OK)
    
    def delete(self, request, username):
        user_to_unfollow = get_object_or_404(User, username=username)
        user_profile_to_unfollow = get_object_or_404(UserProfile, user=user_to_unfollow)
        try:
            following = Follower.objects.get(follower=request.user.profile, following=user_profile_to_unfollow)
            following.delete()
        except IntegrityError:
            return Response({"error": "You are already following this user"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": f"Unfollowed {username}"}, status=status.HTTP_200_OK)