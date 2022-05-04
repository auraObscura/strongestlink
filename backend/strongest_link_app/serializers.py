from rest_framework import serializers
from django.contrib.auth.hashers import make_password

# from .models import FriendRequest, User, UserProfile
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["id", "caption", "date", "image", "comments", "user"]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = User.objects.get(pk=data["user"])
        data["user"] = {"username" : user.username, "id" : user.id}
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = User.objects.get(pk=data["user"])
        data["user"] = {"username" : user.username, "id" : user.id}
        return data

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = "__all__"

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "text", "post", "date", "user"]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = User.objects.get(pk=data["user"])
        data["user"] = {"username" : user.username, "id" : user.id}
        return data

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "type", "name", "description", "latitude", "longitude" ,"date"]

class WeightliftingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weightlifting
        fields = ["id" , "weight" , "user" , "date" , "type" 
        "longitude" ,"date"]

class CardioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cardio
        fields = ["id" , "miles" , "user" , "date" , "type" ]