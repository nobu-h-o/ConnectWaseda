from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone

class Event(models.Model):
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='events',
        null=True,  # allow null 
        blank=True # allow blank for now
    )
    title       = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    date        = models.DateField()
    time        = models.TimeField()
    on_campus   = models.BooleanField(default=True)
    capacity    = models.PositiveIntegerField(null=True, blank=True)
    booked      = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.date < timezone.localdate():
            raise ValidationError({"date": "Event date cannot be in the past."})

    def __str__(self):
        return f"{self.title} @ {self.date} {self.time}"

