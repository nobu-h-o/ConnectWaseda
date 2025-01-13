from django.db import models
from django.conf import settings
#from users.models import User  # Import the User model
from Connect_Waseda_backend.users.models import User

class MeetupSchedule(models.Model):
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organized_meetups')
    title = models.CharField(max_length=300)  # Brief title for the meetup
    description = models.TextField()         # Description or contact info
    timeslot_start = models.DateTimeField()  # Start time for the meetup
    timeslot_end = models.DateTimeField()    # End time for the meetup
    location = models.CharField(max_length=255, blank=True, null=True)  # Optional location

    def __str__(self):
        return f"{self.title} by {self.organizer.username}"
