from rest_framework import viewsets, permissions
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return (permissions.AllowAny(),)
        if self.request.method == "GET":
            return (permissions.IsAuthenticated(),)
        return (permissions.IsAdminUser(),)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def perform_create(self,serializer):
        serializer.save(sender=self.request.user)
        return super().perform_create(serializer)
    
    def perform_update(self,serializer):
        updated_friend_request = serializer.instance
        super().perform_update(serializer)
        if serializer.instance.accepted == True:
            sender = User.objects.get(pk=updated_friend_request.sender.id)
            receiver = User.objects.get(pk=updated_friend_request.receiver.id)
            sender_profile = UserProfile.objects.get(pk=sender.profile.id)
            receiver_profile = UserProfile.objects.get(pk=receiver.profile.id)
            sender_profile.friends.add(receiver_profile.id)
            print(receiver_profile.id)
            receiver_profile.friends.add(sender_profile.id)
            receiver_profile.save()
            sender_profile.save()
        return serializer.save()

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

class WeightliftingViewSet(viewsets.ModelViewSet):
    queryset = Weightlifting.objects.all()
    serializer_class = WeightliftingSerializer

class CardioViewSet(viewsets.ModelViewSet):
    queryset = Cardio.objects.all()
    serializer_class = CardioSerializer

