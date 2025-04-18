# from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Event
from .serializers import EventSerializer

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.order_by("date", "time")
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny] #temporary to test 

    def perform_create(self, serializer):
        # for now, we will not verify
        #serializer.save(organizer=self.request.user)
        serializer.save(organizer=None)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]
    #permission_classes = [permissions.IsAuthenticated]
