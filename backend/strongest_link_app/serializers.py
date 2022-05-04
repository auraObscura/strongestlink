from rest_framework import serializers
from django.contrib.auth.hashers import make_password

# from .models import FriendRequest, User, UserProfile
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        depth = 1

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["id", "caption", "date", "image", "comments", "user"]


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        depth = 1


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        depth = 1


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "text", "post", "date", "user"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "type", "name", "description", "latitude", "longitude"]
