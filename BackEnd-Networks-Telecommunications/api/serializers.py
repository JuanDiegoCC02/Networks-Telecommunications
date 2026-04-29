from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Camera, Router

class UserProfileSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(source='profile.birth_date', required=False, allow_null=True)
    phone_number = serializers.CharField(source='profile.phone_number', required=False, allow_null=True, max_length=20)

    group = serializers.SerializerMethodField()
    
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'password', 'email', 'first_name', 
            'last_name', 'birth_date', 'phone_number', "group"
        ]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }\
        
    def getGroup(self, obj):
        user_groups = obj.groups.values_list('name', flat=True)
        if 'Administrator' in user_groups:
            return 'Administrator'
        return'User'

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # create the user
        user = User.objects.create_user(**validated_data)

        # create the profile
        Profile.objects.create(
            user=user, 
            birth_date=profile_data.get('birth_date'), 
            phone_number=profile_data.get('phone_number')
        )
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile, created = Profile.objects.get_or_create(user=instance)
        if profile_data:
            profile.birth_date = profile_data.get('birth_date', profile.birth_date)
            profile.phone_number = profile_data.get('phone_number', profile.phone_number)
            profile.save()

        return instance

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

class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

class RouterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Router
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}