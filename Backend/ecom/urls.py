"""
URL configuration for ecom project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# from rest_framework_swagger.views import get_swagger_view 
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

# schema_view  = get_swagger_view(title="Wild Fab API")
from drf_spectacular.views import  SpectacularJSONAPIView , SpectacularSwaggerView

urlpatterns = [

    path('ad/', admin.site.urls),
    path('api/',SpectacularJSONAPIView.as_view(),name="schema"),
    path('',SpectacularSwaggerView.as_view()),
    path('users/',include('accounts.urls')),
    path('admin/',include('manager.routers')),
    path('shop/',include('shop.urls')),
    path('orders/',include('checkouts.urls')),
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

