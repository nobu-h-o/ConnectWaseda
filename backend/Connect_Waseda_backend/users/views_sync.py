from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class SyncUserView(APIView):
    """
    This endpoint receives a POST request with user details (from NextAuth)
    and creates or updates a corresponding user record in Django.
    """

    def post(self, request):
        data = request.data
        email = data.get("email")
        first_name = data.get("firstName", "")
        last_name = data.get("lastName", "")
        #google_id = data.get("googleId")  # optional, want to store it

        # # Optional: Additional validation on email (although NextAuth already validates the domain)
        # if not email or not email.endswith("waseda.jp"):
        #     return Response({"error": "Invalid email domain."}, status=status.HTTP_400_BAD_REQUEST)

        # Create or update the user record
        user, created = User.objects.get_or_create(email=email, defaults={
            "username": email,  
            "first_name": first_name,
            "last_name": last_name,
        })

        # If the user already exists, update the details if necessary.
        if not created:
            updated = False
            if first_name and user.first_name != first_name:
                user.first_name = first_name
                updated = True
            if last_name and user.last_name != last_name:
                user.last_name = last_name
                updated = True
            if updated:
                user.save()

        # Future augmentation: handle saving the Google ID or other extra info here.

        return Response(
            {"message": "User synced successfully", "created": created},
            status=status.HTTP_200_OK
        )
