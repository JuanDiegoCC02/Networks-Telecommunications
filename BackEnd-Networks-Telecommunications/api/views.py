from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from .serializers import UserProfileSerializer
from rest_framework import viewsets
from .models import Camera
from .serializers import CameraSerializer
from .models import Router
from .serializers import RouterSerializer
from django.contrib.auth.models import Group

# Register View
class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        # show data return 
        print("DATA return:", request.data)  

        serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            group, created = Group.objects.get_or_create(name='User')
            user.groups.add(group)

            print("User created:", user.username)  # confirm

            return Response(
                {"message": "User and Profile created successfully"},
                status=status.HTTP_201_CREATED
            )

        print("Failed serializers", serializer.errors)  # failed

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Log In View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        login_access = request.data.get('loginAccess')
        password = request.data.get('password')

        user = None

        if login_access and "@" in login_access:
            try:
                user_obj = User.objects.get(email__iexact=login_access)
                user = authenticate(
                    request,
                    username=user_obj.username,
                    password=password
                )
            except User.DoesNotExist:
                user = None

        else:
            user = authenticate(
                request,
                username=login_access,
                password=password
            )

        if user is not None:
            login(request, user)
            user_group = user.groups.first().name if user.groups.exists() else "User"  
            return Response({
                "message": "Login successful",
                "username": user.username,
                "email": user.email,
                "group": user_group
            }, status=status.HTTP_200_OK)

        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

# Log Out View
class LogoutView(APIView):
    # close session
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

# Profile View 
class MyProfileView(APIView):
    # view segurity
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # access profile model
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.profile.phone_number,
            "birth_date": user.profile.birth_date
        })

#Camera View CRUD system
class CameraViewSet(viewsets.ModelViewSet):
    queryset = Camera.objects.all()
    serializer_class = CameraSerializer

#Router View CRUD system
class RouterViewSet(viewsets.ModelViewSet):
    queryset = Router.objects.all()
    serializer_class = RouterSerializer


