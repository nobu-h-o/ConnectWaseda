from django.contrib import admin
from .models import MeetupSchedule

@admin.register(MeetupSchedule)
class MeetupScheduleAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'timeslot_start', 'timeslot_end', 'location')
    search_fields = ('title', 'organizer__username')
    list_filter = ('timeslot_start', 'timeslot_end')

