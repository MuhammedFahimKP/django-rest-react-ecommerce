from django.urls import path
from . import viewsets


urlpatterns = [
    path('product/',viewsets.AdminProductCreate.as_view())
]
