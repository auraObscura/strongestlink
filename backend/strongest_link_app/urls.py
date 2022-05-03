from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
router.register("posts" , PostsViewSet, basename="post")
router.register("comments" , CommentsViewSet, basename="comment")

urlpatterns = [
    path("",include(router.urls)),
]
