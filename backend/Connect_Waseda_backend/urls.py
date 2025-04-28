"""
URL configuration for Connect_Waseda_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include 
from django.http import HttpResponse
# adding user registration

urlpatterns = [
    path('', lambda request: HttpResponse("Welcome to Connect Waseda Backend!"), name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/users/', include('Connect_Waseda_backend.users.urls')), # Groups all users endpoints under /api/users/
    path('api/events/', include('Connect_Waseda_backend.events.urls')),
    #path('api/meetups/', include('Connect_Waseda_backend.meetups.urls')), # Groups all meetups endpoints under /api/meetups/
]
