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

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all().order_by("-id")
    serializer_class = CommentsSerializer

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
