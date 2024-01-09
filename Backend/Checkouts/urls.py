from django.urls import path
from . import views

urlpatterns = [
    
    # order 
    path('',views.OrderCreateApiView.as_view(),name="order"),
    
    
    
    # razor pay order verfiy 
    path('razorpay/verify/',views.PaymentOrderVerifyApiView.as_view(),name="razorpay_verify")
    
    
]
