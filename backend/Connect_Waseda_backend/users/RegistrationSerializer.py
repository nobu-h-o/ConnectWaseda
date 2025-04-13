from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Fields expected from the registration endpoint.
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Using Django's create_user ensures password hashing and proper setup.
        user = User.objects.create_user(**validated_data)
        return user
