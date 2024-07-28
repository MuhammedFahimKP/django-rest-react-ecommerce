from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)




urlpatterns = [

    path('refresh/',TokenRefreshView.as_view(),name="refresh token"),
    path('signup/',views.UserSigninAPIView.as_view()),
    path('signin/',views.UserSigninAPIView.as_view()),
    # path('<str:pk>/',views.UserProfileRetriveAPIView.as_view()),
    
    # path('hai/',view=views.HaiAPIview.as_view()),
    
    path('token/verify',TokenVerifyView.as_view(),name="token_verify"),
    path('token/blacklist',TokenBlacklistView.as_view(),name="blacklist"),
    path('signout/',views.BlackListTokenView.as_view()),
    path('google/',views.GoogleUserSiginAPIView.as_view()),
    path('user-activation/<str:token>/',views.UserActivaionApiView.as_view(),name="activate"),
    path('user-update/',views.UserUpdateApiView.as_view()),
    path('change-password/',views.UserChangePasswordAPIView.as_view(),name="change_password"),
    path('shipping-address/',views.ShippingAddressListCreateApiView.as_view(),name="shiping-address"),
    path('shipping-address/<str:pk>/',views.ShippingAddressDeleteUpdateRetrieveApiView.as_view(),name="shipping-address-delete-update-retrieve")
]
