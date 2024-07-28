from django.urls import path
from . import views

urlpatterns = [
    
    # order 
    path('',views.OrderCreateListApiView.as_view(),name="order"),
    
    
    
    path('total/',views.CalculateTotalAmountAPIView.as_view(),name="calculate-total"),
    
    # razor pay order verfiy 
    path('razorpay/verify/',views.PaymentOrderVerifyApiView.as_view(),name="razorpay_verify"),
    
    path('<uuid:pk>/' ,views.OrderCreateListApiView.as_view(),name="order-reterival-destory-update"),
    
   
    
    
]
