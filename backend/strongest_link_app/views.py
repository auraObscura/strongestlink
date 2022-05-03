from rest_framework import viewsets, permissions
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return (permissions.AllowAny(),)
        return (permissions.IsAdminUser(),)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer


class PostsViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all().order_by("-id")
    serializer_class = PostsSerializer


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all().order_by("-id")
    serializer_class = CommentsSerializer
