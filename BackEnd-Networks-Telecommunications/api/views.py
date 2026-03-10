from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import UserProfileSerializer

class RegisterView(APIView):
    # register view (AllowAny)
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User and Profile created successfully"}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    # log in  validations django
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # authenticate data MySQL
        user = authenticate(username=username, password=password)

        # create django_session on the server and the cookie on the client
        if user is not None:
            login(request, user) 
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        
        return Response(
            {"error": "Invalid username or password"}, 
            status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    # close session
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


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