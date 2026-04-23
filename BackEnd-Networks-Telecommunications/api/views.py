from django.contrib.auth.models import Group
from django.contrib.auth import logout

from rest_framework import status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Camera, Router
from .serializers import UserProfileSerializer, CameraSerializer, RouterSerializer, ProfileDetailSerializer


# View LogIn (JWT) 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Personaliza la respuesta del token para incluir info del usuario."""
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

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#View Register
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Asignación automática de grupo
            group, _ = Group.objects.get_or_create(name='User')
            user.groups.add(group)
            
            return Response(
                {"message": "User created successfully"}, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#View Log out
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request) # Limpia la sesión en el servidor
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Usamos .get para evitar errores si el perfil no existe
        profile = getattr(user, 'profile', None)
        
        if profile:
            serializer = ProfileDetailSerializer(profile)
            return Response(serializer.data)

        return Response({
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": None,
            "birth_date": None
        })

#View Cameras
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

#View Routers
class RouterViewSet(viewsets.ModelViewSet):
    serializer_class = RouterSerializer
    permission_classses = [IsAuthenticated]

    def get_queryset(self):
        user =self.request.user
        if user.is_staff or user.groups.filter(name='Administrator').exists():
            return Router.objects.all()
        return Router.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
