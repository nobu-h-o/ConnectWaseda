from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.utils import timezone
import datetime

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
    club_rep = models.BooleanField(default=True)
    category = models.TextField(blank=True)
    language = models.TextField(blank=True)

    start_date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_date   = models.DateField(null=True, blank=True)
    end_time   = models.TimeField(null=True, blank=True)
    

    host_notes  = models.TextField(blank=True)
    on_campus   = models.BooleanField(default=True)
    capacity    = models.PositiveIntegerField(null=True, blank=True)
    booked      = models.PositiveIntegerField(default=0)

    created_at  = models.DateTimeField(auto_now_add=True)

    def clean(self):
        tz = timezone.get_current_timezone()
        start_dt = datetime.datetime.combine(self.start_date, self.start_time)
        end_dt   = datetime.datetime.combine(self.end_date,   self.end_time)
        start_dt = tz.localize(start_dt) if timezone.is_naive(start_dt) else start_dt
        end_dt   = tz.localize(end_dt)   if timezone.is_naive(end_dt)   else end_dt

        now = timezone.now()
        # 1) Start must be ≥ 
        if start_dt < now:
            raise ValidationError("Start date/time cannot be in the past.")
        # 2) End must be after start
        if end_dt <= start_dt:
            raise ValidationError("End date/time must be after the start date/time.")

    def __str__(self):
        return f"{self.title} ({self.start_date} {self.start_time} – {self.end_date} {self.end_time})"

