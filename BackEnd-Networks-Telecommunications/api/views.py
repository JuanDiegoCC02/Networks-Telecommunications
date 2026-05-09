from django.contrib.auth.models import User, Group
from django.contrib.auth import logout

from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Camera, Router
from .serializers import UserProfileSerializer, CameraSerializer, RouterSerializer, ProfileDetailSerializer

# Token JTW Serializer 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Añade info extra al JSON que recibe el frontend al hacer login."""
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user_groups = user.groups.values_list('name', flat=True)

        data.update({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'group': 'Administrator' if 'Administrator' in user_groups else (user_groups[0] if user_groups else 'User')
        })
        return data

# View autentication
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)

# View User
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()] 

    def perform_create(self, serializer):
        user = serializer.save()
        group, _ = Group.objects.get_or_create(name='User')
        user.groups.add(group)

# View Profile
class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)
        if profile:
            serializer = ProfileDetailSerializer(profile)
            return Response(serializer.data)
        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        })

# View Camera
class CameraViewSet(viewsets.ModelViewSet):
    serializer_class = CameraSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.groups.filter(name='Administrator').exists():
            return Camera.objects.all()
        return Camera.objects.filter(user=user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# View Router
class RouterViewSet(viewsets.ModelViewSet):
    serializer_class = RouterSerializer
    permission_classes = [IsAuthenticated] 
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.groups.filter(name='Administrator').exists():
            return Router.objects.all()
        return Router.objects.filter(user=user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# View Stats
class MyStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        total_cameras = Camera.objects.filter(
            user=user
        ).count()
        total_routers = Router.objects.filter(
            user=user
        ).count()
        return Response({

            "total_cameras": total_cameras,
            "total_routers": total_routers,

        })