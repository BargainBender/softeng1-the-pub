from django.shortcuts import get_object_or_404
from django.contrib.auth import logout
from django.contrib.auth.models import User

from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.authentication import TokenAuthentication

from .models import UserProfile
from .serializers import UserProfileSerializer, UserDetailsSerializer, CreateUserSerializer, ChangeUserPasswordSerializer
from .permissions import EditProfilePermission
# Create your views here.

class UserProfileDetailUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, EditProfilePermission]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'
    
    def get_object(self):
        # Get the User object using the username from the URL
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        # Get the UserProfile object related to the User
        return get_object_or_404(UserProfile, user=user)

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()

    def get_serializer_class(self):
      if self.request.method == "GET":
          return UserDetailsSerializer
      elif self.request.method == "POST":
          return CreateUserSerializer

class UserSettingsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    def get_object(self):
        return self.request.user
    
class ChangeUserPasswordAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangeUserPasswordSerializer
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