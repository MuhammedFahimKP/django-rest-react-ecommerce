from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response 
from .models import Order

from .serializer import ( 
                         
    OrderCreateSerializer,
    OrderListSearializer,
    PaymentOrderCreateSerializer,
    PaymentOrderVerifySerializer 
)

from ecom.mixins import JWTPermission as JWTAUTHENTICATION 
from .utils import RazorPay

# Create your views here.
class OrderCreateApiView(JWTAUTHENTICATION,generics.GenericAPIView):
    
    
    queryset         = Order.objects.all()
    
    
    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
    
    
    # def get_serializer(self, *args, **kwargs):
    #     return super().get_serializer(*args, **kwargs)
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            return OrderCreateSerializer
        
        return OrderListSearializer
            
    
    
    def get(self, request, format=None):
        
        serializer =  self.get_serializer(self.get_queryset(),many=True)
        
        return Response(serializer.data)
    
    
    
    
    
    def post(self,request,*args, **kwargs):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        


        
        if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            
            return Response({"success":"order created "},status=201)
        
        return Response(serializer.errors,status=404)
  


class PaymentOrderCreateApiView(JWTAUTHENTICATION,generics.GenericAPIView):
    
    serializer_class = PaymentOrderCreateSerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        
        if serailizer.is_valid(raise_expection=True):
            
            serailizer.save()
    
            return Response(serailizer.data,status=status.HTTP_201_CREATED)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    
class PaymentOrderVerifyApiView(JWTAUTHENTICATION,generics.GenericAPIView):
    
    serializer_class = PaymentOrderVerifySerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        
        if serailizer.is_valid(raise_expection=True):
            
            check = RazorPay.verfiy_payment(

                order_id   = serailizer.validated_data['order_id'],
                payment_id = serailizer.validated_data['payment_id'],
                signature  = serailizer.validated_data['signature']
    
            )
            
            if check is None:

                return Response(check.data,status.HTTP_200_OK)
    
            return Response({"error":"wrong  payment_id or order id or verfication id "},status=status.HTTP_400_BAD_REQUEST)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
        

                

    
    
    
    
    
    
            
        
            
            
            
         
        