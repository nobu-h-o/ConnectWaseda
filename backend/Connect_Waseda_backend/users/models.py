from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)  # Email should be unique
    is_organizer = models.BooleanField(default=False)  # Optional field to identify organizers
    bio = models.TextField(blank=True, null=True)
    

    def __str__(self):
        return self.username




