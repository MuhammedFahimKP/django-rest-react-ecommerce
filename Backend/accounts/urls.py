from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)


urlpatterns = [

    path('register/',views.UserRegisterApiView.as_view()),
    path('user/<str:pk>/',views.UserProfileRetriveAPIView.as_view()),
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh',TokenRefreshView.as_view(),name="token_refresh"),
    path('token/verify',TokenVerifyView.as_view(),name="token_verify"),
    path('token/blacklist',TokenBlacklistView.as_view(),name="blacklist"),
    path('signin/',views.UserSigninAPIView.as_view()),
    path('signout/',views.BlackListTokenView.as_view()),
    path('google/',views.GoogleUserSiginAPIView.as_view()),
    path('user-activation/<str:token>/',views.UserActivaionApiView.as_view(),name="activate"),
    path('user-update',views.UserUpdateApiView.as_view())
]
