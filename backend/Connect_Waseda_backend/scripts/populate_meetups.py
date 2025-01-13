import os
import sys
import django
from datetime import datetime, timedelta

# script to populate django db with sample data


# Ensures the backend directory (project root) is added to the Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.append(project_root)

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Connect_Waseda_backend.settings")
django.setup()

print("Current Working Directory:", os.getcwd())
print("Python Path:", sys.path)

from Connect_Waseda_backend.users.models import User
from meetups.models import MeetupSchedule

# Create a test user if it doesn’t already exist
organizer, created = User.objects.get_or_create(
    username="testorganizer",
    email="testorganizer@example.com",
    defaults={"password": "password123", "is_organizer": True},
)

if created:
    print("Created test user:", organizer.username)
else:
    print("Test user already exists:", organizer.username)

# Populate the database with sample meetups
today = datetime.now()
base_date = today.replace(day=1)  # Start at the beginning of the month
sample_meetups = [
    {"title": "English Workshop", "description": "Practice speaking English!", "days_ahead": 2, "location": "Waseda Central Library"},
    {"title": "Hackathon Teaming", "description": "Find your team", "days_ahead": 5, "location": "Building 11"},
    {"title": "Job Hunting Mentorship", "description": "Get a job in Japan!", "days_ahead": 10, "location": "Waseda Co-op"},
]

for meetup in sample_meetups:
    timeslot_start = base_date + timedelta(days=meetup["days_ahead"], hours=14)  # Start at 2:00 PM
    timeslot_end = timeslot_start + timedelta(hours=2)  # Ends at 4:00 PM

    meetup_obj, meetup_created = MeetupSchedule.objects.get_or_create(
        organizer=organizer,
        title=meetup["title"],
        defaults={
            "description": meetup["description"],
            "timeslot_start": timeslot_start,
            "timeslot_end": timeslot_end,
            "location": meetup["location"],
        },
    )

    if meetup_created:
        print(f"Created meetup: {meetup_obj.title}")
    else:
        print(f"Meetup already exists: {meetup_obj.title}")

print("Database population complete!")
