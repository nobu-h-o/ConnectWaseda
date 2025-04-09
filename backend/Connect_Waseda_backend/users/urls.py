# your_app_name/urls.py
from django.urls import path
from .views import RegistrationView
from .views_sync import SyncUserView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('google-sync/', SyncUserView.as_view(), name='google-sync')
]
