from django.urls import path
from .views import EventListCreate, EventDetail

urlpatterns = [
    path("",        EventListCreate.as_view(), name="events-list-create"),
    path("<int:pk>/", EventDetail.as_view(),   name="events-detail"),
]
