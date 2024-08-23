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


from django.shortcuts import render
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from debug_toolbar import urls
# schema_view  = get_swagger_view(title="Wild Fab API")
from drf_spectacular.views import   SpectacularSwaggerView,SpectacularJSONAPIView




def get_index(request) :
    return render(request,'activation.html',context= {
        'frontend_link' :'http://localhost:5173/'
    })







urlpatterns = [

    path('ad/', admin.site.urls),
    # path("schema/", SpectacularAPIView.as_view(), name="schema"),
    # path(
    #     "",
    #     SpectacularSwaggerView.as_view(
    #         template_name="swagger-ui.html", url_name="schema"
    #     ),
    #     name="swagger-ui",
    # ),
    
    path('halo/',get_index),
    path('api/',SpectacularJSONAPIView.as_view(),name="schema"),
    path('',SpectacularSwaggerView.as_view()),
    path('users/',include('accounts.urls')),
    path('admin/',include('manager.urls')),
    path('shop/',include('shop.urls')),
    path('orders/',include('checkouts.urls')),
    path('__debug__/', include('debug_toolbar.urls')),   
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT) 


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL , document_root = settings.STATIC_ROOT)

