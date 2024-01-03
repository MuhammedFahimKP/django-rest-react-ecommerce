from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import OrderItems
from .serializer import OrderCreateSerializer


# Create your views here.
class OrderCreateApiView(generics.GenericAPIView):
    
    serializer_class = OrderCreateSerializer
    queryset         = OrderItems.objects.all()
    
    
    def post(self,request,*args, **kwargs):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        


        
        if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            
            return Response(serializer.data,status=201)
        
        return Response(serializer.errors,status=404)