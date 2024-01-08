from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response
from ecom.mixins import JWTPermission 
from .models import OrderItems,Order
from .serializer import OrderCreateSerializer,OrderListSearializer


# Create your views here.
class OrderCreateApiView(JWTPermission,generics.GenericAPIView):
    
    
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
    
    

                

    
    
    
    
    
    
            
        
            
            
            
         
        