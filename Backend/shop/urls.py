from django.urls import path
from . import views 

urlpatterns = [

    path('cart',views.CartItemCreateApiView.as_view(),name="cartitemView")
]

