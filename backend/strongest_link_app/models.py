from django.db import models
from django.contrib.auth.models import User

# havent added the user yet
class Posts(models.Model):
    caption = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)
    image = models.URLField()

# havent added the user yet
class Comments(models.Model):
    text = models.TextField()
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    date = models.DateTimeField(auto_now_add=True, blank=True)

