from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import Profile, Camera, Router

# Serializer for User with nested Profile data and Group handling
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
        }
        
    # Method to get the users group name for display in GET responses
    def get_group(self, obj):
        user_groups = obj.groups.values_list('name', flat=True)
        if 'Administrator' in user_groups:
            return 'Administrator'
        return 'User'

    def create(self, validated_data):
        # Pop profile data from validated data
        profile_data = validated_data.pop('profile', {})
        
        # Create user using Django helper to hash the password
        user = User.objects.create_user(**validated_data)

        # Create the associated profile
        Profile.objects.create(
            user=user, 
            birth_date=profile_data.get('birth_date'), 
            phone_number=profile_data.get('phone_number')
        )
        return user

# Custom update method to handle nested profile updates and Group assignment
    def update(self, instance, validated_data):
        # Extract raw data for fields that aren't in validated_data "group"
        request = self.context.get('request')
        new_group_name = None
        if request and 'group' in request.data:
            new_group_name = request.data.get('group')

        # Extract nested profile data and password
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password', None)
        
        if password:
            instance.set_password(password)

        # Update standard User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle Group assignment & clearing existing groups 
        if new_group_name:
            group_obj = Group.objects.filter(name=new_group_name).first()
            if group_obj:
                instance.groups.clear()
                instance.groups.add(group_obj)

        # Update or Create the associated Profile
        profile, created = Profile.objects.get_or_create(user=instance)
        if profile_data:
            profile.birth_date = profile_data.get('birth_date', profile.birth_date)
            profile.phone_number = profile_data.get('phone_number', profile.phone_number)
            profile.save()

        return instance

# Serializer for Profile details "used in GET response to show profile info"
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

# Serializer for Camera
class CameraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}

# Serializer for Router 
class RouterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Router
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}}