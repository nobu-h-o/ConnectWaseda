from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ('username', 'email', 'password')
        extra_kwargs = {"password": {'write_only': True}}

    def create(self, validated_data):
        """
        uses django create_user method for password hashing
        """
        user = User.objects.create_user(**validated_data)
        return user 