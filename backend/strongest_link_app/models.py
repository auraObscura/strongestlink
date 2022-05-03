from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import User

# havent added the user yet
class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    caption = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)
    image = models.URLField()


# havent added the user yet
class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    date = models.DateTimeField(auto_now_add=True, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField("self", blank=True)
    profile_img = models.ImageField(blank=True, upload_to="profiles")


class FriendRequest(models.Model):
    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="requests_sent"
    )
    receiver = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="requests_received"
    )
    accepted = models.BooleanField(default=False)

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationErr("It wouldn't count, anyway")
        return super().clean()
