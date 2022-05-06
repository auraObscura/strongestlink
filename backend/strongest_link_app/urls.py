from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

r = DefaultRouter()
r.register("users", UserViewSet, basename="user")
r.register("profiles", UserProfileViewSet, basename="profile")
r.register("friend-requests", FriendRequestViewSet, basename="friend-request")
r.register("posts", PostsViewSet, basename="post")
r.register("comments", CommentsViewSet, basename="comment")
r.register("locations", LocationViewSet, basename="location")
r.register("lifts", WeightliftingViewSet, basename="lift")
r.register("cardio", CardioViewSet, basename="cardio")


urlpatterns = [
    path("", include(r.urls)),
]
