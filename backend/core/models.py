from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError

from random import choice
from string import ascii_letters

# Create your models here.


def generate_random_default_profile_picture():
    return "https://api.dicebear.com/7.x/notionists-neutral/svg?seed=" + "".join(
        choice(ascii_letters) for _ in range(10)
    )


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.URLField(
        default=generate_random_default_profile_picture, null=False, max_length=200
    )
    is_active = models.BooleanField(default=True, null=False)

    @property
    def username(self):
        return self.user.username
    
    @property
    def name(self):
        return self.user.first_name + " " + self.user.last_name
    
    @property
    def followers(self):
        return Follower.objects.all()
    
    @property
    def following(self):
        return Follower.objects.all()

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
        return self.user.username


class Follower(models.Model):
    follower = models.ForeignKey(
        UserProfile, related_name="following", on_delete=models.CASCADE
    )
    following = models.ForeignKey(
        UserProfile, related_name="follower", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.follower == self.following:
            raise ValidationError("A user cannot follow themselves")
        return super().save(*args, **kwargs)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["follower", "following"], name="unique_follower")
        ]