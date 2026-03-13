from django.urls import path
from .views import RegisterView, LoginView, LogoutView, MyProfileView

urlpatterns = [
    path('users/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('profile/', MyProfileView.as_view()),
]