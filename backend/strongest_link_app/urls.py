from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

r = DefaultRouter()
r.register("users", UserViewSet, basename="user")
r.register("profiles", UserProfileViewSet, basename="profile")
r.register("requests", FriendRequestViewSet, basename="request")
r.register("posts", PostsViewSet, basename="post")
r.register("comments", CommentsViewSet, basename="comment")
r.register("locations", LocationViewSet, basename="location")

urlpatterns = [
    path("", include(r.urls)),
]
