from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework import authentication, generics, mixins#, permissions
from rest_framework.response import Response

from .models import UserProfile
from .serializers import UserProfileSerializer

# Create your views here.

class UserProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'
    
    def get_object(self):
        # Get the User object using the username from the URL
        user = get_object_or_404(User, username=self.kwargs.get('username'))
        # Get the UserProfile object related to the User
        return get_object_or_404(UserProfile, user=user)
