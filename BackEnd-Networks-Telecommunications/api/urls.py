from django.urls import path, include
from .views import RegisterView, LoginView, LogoutView, MyProfileView, CameraViewSet, RouterViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('cameras', CameraViewSet)
router.register('routers', RouterViewSet)


urlpatterns = [
    path('users/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', MyProfileView.as_view()),

     path('', include(router.urls)),

]