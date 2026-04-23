from django.urls import path, include
from .views import RegisterView, LoginView, LogoutView, MyProfileView, CameraViewSet, RouterViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('cameras', CameraViewSet, basename='camera')
router.register('routers', RouterViewSet, basename='router')


urlpatterns = [
    
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('users/', RegisterView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', MyProfileView.as_view()),

     path('', include(router.urls)),

]