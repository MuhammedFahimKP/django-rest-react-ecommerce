from django.urls import path
from . import views

urlpatterns = [
    
    # order 
    path('',views.OrderCreateListApiView.as_view(),name="order"),
    
    
    
    # razor pay order verfiy 
    path('razorpay/verify/',views.PaymentOrderVerifyApiView.as_view(),name="razorpay_verify")
    
    
]
