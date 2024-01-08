from django.urls import path
from . import views
from payment_gateway_api.razorpay.views import PaymentOrderCreateApiView,PaymentOrderVerifyApiView

urlpatterns = [
    path('',views.OrderCreateApiView.as_view(),name="order"),
    
    path('razorpay/create/',PaymentOrderCreateApiView.as_view(),name="razorpay_order_create"),
    
    path('razorpay/verify/',PaymentOrderVerifyApiView.as_view(),name="razorpay_verify")
    
]
