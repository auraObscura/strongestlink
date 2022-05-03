from rest_framework import serializers
from .models import *


# havent added the user yet
class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ["id" , "caption", "date", "image", "comments"]

# havent added the user yet
class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id" , "text" , "post", "date"]