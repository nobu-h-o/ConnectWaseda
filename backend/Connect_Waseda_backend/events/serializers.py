from rest_framework import serializers
from django.utils import timezone
import datetime
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "organizer",
            "club_rep",
            "title",
            "description",
            "category",
            "language",
            "start_date",
            "start_time",
            "end_date",
            "end_time",
            "on_campus",
            "capacity",
            "booked",
            "host_notes",
            "created_at",
        ]
        read_only_fields = ["organizer", "booked", "created_at"]

    def validate(self, data):
        """
        Object-level validation to ensure:
          1) start_datetime >= now
          2) end_datetime > start_datetime
        """
        
        start_dt = datetime.datetime.combine(data["start_date"], data["start_time"])
        end_dt   = datetime.datetime.combine(data["end_date"],   data["end_time"])
        # Make them timezone-aware
        start_dt = timezone.make_aware(start_dt)
        end_dt   = timezone.make_aware(end_dt)

        now = timezone.now()
        if start_dt < now:
            raise serializers.ValidationError("Start date/time cannot be in the past.")
        if end_dt <= start_dt:
            raise serializers.ValidationError("End date/time must be after the start date/time.")

        return data
