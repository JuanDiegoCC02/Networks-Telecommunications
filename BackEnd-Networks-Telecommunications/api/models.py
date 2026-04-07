from django.db import models
from django.contrib.auth.models import User

# UserModel
class Profile(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='profile'
    )
    
    birth_date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    
    # Metadata para auditoría (professional projects)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"Profile of {self.user.username}"


 # CameraModel
class Camera(models.Model):
    name = models.CharField(max_length=100)

    ip_address = models.CharField(max_length=80)

    url_address = models.URLField()

    description = models.TextField(blank=True)


    location = models.CharField(
        max_length=20,
        choices=[('San José', 'San José'), ('Cartago', 'Cartago'),('Heredia', 'Heredia'),('Alajuela', 'Alajuela'),('Limón', 'Limón'),('Puntarenas', 'Puntarenas'),('Guanacaste', 'Guanacaste')],
        default='San Jose'
    )

    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    
    status = models.CharField(
        max_length=10,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# RouterModel
class Router(models.Model):
    name = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=80)
    mac_address = models.CharField(max_length=50)

    brand = models.CharField(max_length=50, blank=True)
    model = models.CharField(max_length=50, blank=True)

    location = models.CharField(
        max_length=20,
        choices=[('San José', 'San José'), ('Cartago', 'Cartago'),('Heredia', 'Heredia'),('Alajuela', 'Alajuela'),('Limón', 'Limón'),('Puntarenas', 'Puntarenas'),('Guanacaste', 'Guanacaste')],
        default='San José'
    )

    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    status = models.CharField(
        max_length=10,
        choices=[('Active', 'Active'), ('Inactive', 'Inactive')],
        default='Active'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    