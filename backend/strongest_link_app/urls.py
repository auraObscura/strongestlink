from rest_framework import routers
from django.urls import path, include
from .views import UserProfileViewSet, FriendRequestViewSet, UserViewSet

r = routers.DefaultRouter()

r.register("users", UserViewSet, basename="user")
r.register("profiles", UserProfileViewSet, basename="profile")
r.register("requests", FriendRequestViewSet, basename="request")

urlpatterns = [path("", include(r.urls))]
