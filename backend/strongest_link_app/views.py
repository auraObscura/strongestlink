from rest_framework.viewsets import ModelViewSet
from .serializers import *


class PostsViewSet(ModelViewSet):
    queryset = Posts.objects.all().order_by("-id")
    serializer_class = PostsSerializer

class CommentsViewSet(ModelViewSet):
    queryset = Comments.objects.all().order_by("-id")
    serializer_class = CommentsSerializer