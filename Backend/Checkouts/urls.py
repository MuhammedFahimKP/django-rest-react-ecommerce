from django.urls import path
from . import views

urlpatterns = [
    path('',views.OrderCreateApiView.as_view(),name="order"),
    
    path('razorpay/create/',views.PaymentOrderCreateApiView.as_view(),name="razorpay_order_create"),
    
    path('razorpay/verify/',views.PaymentOrderVerifyApiView.as_view(),name="razorpay_verify")
    
]
