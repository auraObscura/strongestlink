from xml.dom import ValidationErr
from django.db import models
from django.contrib.auth.models import User

class Posts(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts", default=""
    )
    caption = models.TextField()
    date = models.DateTimeField(auto_now_add=True, blank=True)
    image = models.URLField()

class Comments(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments", default=""
    )
    text = models.TextField()
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    date = models.DateTimeField(auto_now_add=True, blank=True)

class UserProfile(models.Model):
    class Gender(models.TextChoices):
        unspecified = ""
        male = "Male"
        female = "Female"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    friends = models.ManyToManyField("self", blank=True)
    profile_img = models.URLField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)
    about_me = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices = Gender.choices, null=True, blank=True)


class FriendRequest(models.Model):
    class Meta:
        unique_together = ("sender" , "receiver")
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="requests_sent"
    )
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="requests_received"
    )
    accepted = models.BooleanField(default=False)

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationErr("It wouldn't count, anyway")
        return super().clean()


class Location(models.Model):
    class Type(models.TextChoices):
        gym = "Gym"
        run = "Run"
        bike = "Bike"
    
    type = models.CharField(max_length=10, choices = Type.choices)
    name = models.CharField(max_length=256)
    description = models.TextField(null=True, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    date = models.DateTimeField(auto_now_add=True, blank=True)

class Weightlifting(models.Model):
    class Type(models.TextChoices):
        bench = "Bench"
        squat = "Squat"
        deadlift = "Deadlift"

    weight = models.DecimalField(max_digits=5, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lifts")
    date = models.DateTimeField(auto_now_add=True, blank=True)
    type = models.CharField(max_length=12, choices = Type.choices)

class Cardio(models.Model):
    class Type(models.TextChoices):
        run = "Run"
        bike = "Bike"

    miles = models.DecimalField(max_digits=5, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cardio")
    date = models.DateTimeField(auto_now_add=True, blank=True)
    type = models.CharField(max_length=10, choices = Type.choices)
    
