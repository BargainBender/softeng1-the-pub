from django.shortcuts import get_object_or_404
from django.contrib.auth import logout
from django.contrib.auth.models import User

from rest_framework import authentication, generics, mixins, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from api.authentication import TokenAuthentication

from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
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
    serializer_class = UserSerializer

# TODO: Remove RETRIEVE functionality
class UserSettingsAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    def get_object(self):
        return self.request.user
    
class LogoutAPIView(APIView):
    queryset = Token.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]

    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Logged out"}, status=status.HTTP_200_OK)