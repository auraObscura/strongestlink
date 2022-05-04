from django.contrib import admin

from .models import (
    FriendRequest,
    UserProfile,
)

admin.site.register([UserProfile, FriendRequest])
