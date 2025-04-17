from rest_framework import serializers
from .models import Event
from django.utils import timezone

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "organizer",
            "title",
            "description",
            "date",
            "time",
            "on_campus",
            "capacity",
            "booked",
        ]
        read_only_fields = ["organizer", "booked"]

    def validate_date(self, value):
        if value < timezone.localdate():
            raise serializers.ValidationError("Event date cannot be in the past.")
        return value
