from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserProfileSerializer(serializers.ModelSerializer):
    #data profile
    birth_date = serializers.DateField(write_only=True)
    phone_number = serializers.CharField(write_only=True, max_length=20)
    
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'password', 'email', 'first_name', 
            'last_name', 'birth_date', 'phone_number'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        # 1. obtain profile data
        birth_date = validated_data.pop('birth_date')
        phone_number = validated_data.pop('phone_number')

        # 2. create userBase / encrypts the password
        user = User.objects.create_user(**validated_data)

        # 3. create user & perfil automatic
        Profile.objects.create(
            user=user, 
            birth_date=birth_date, 
            phone_number=phone_number
        )
        
        return user

class ProfileDetailSerializer(serializers.ModelSerializer):

    user_details = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user_details', 'birth_date', 'phone_number', 'profile_picture']

    def get_user_details(self, obj):
        return {
            "username": obj.user.username,
            "email": obj.user.email,
            "full_name": f"{obj.user.first_name} {obj.user.last_name}"
        }