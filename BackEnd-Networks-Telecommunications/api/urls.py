from django.urls import path, include
from rest_framework.routers import DefaultRouter
#  import to views
from .views import (
    LoginView, 
    LogoutView,         
    MyProfileView,
    MyStatsView, 
    UserViewSet, 
    CameraViewSet, 
    RouterViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register('cameras', CameraViewSet, basename='camera')
router.register('routers', RouterViewSet, basename='router')
router.register('users', UserViewSet, basename='user')



urlpatterns = [
    
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view()),
    
    path('profile/', MyProfileView.as_view()),
    path('my-stats/', MyStatsView.as_view()),
    
    path('', include(router.urls)),
]