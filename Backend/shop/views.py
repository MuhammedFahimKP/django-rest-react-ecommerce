# from django.shortcuts import render
from rest_framework import generics,permissions
from rest_framework.response import Response
from .models import Categoery
from ecom.mixins import JWTPermission
                    
from .serializers import (
    CategoerySerializer,

)


# Create your views here.



class CategoeryCreateApiView(generics.ListAPIView):


    # permission_classes = [permissions.IsAdminUser]

    queryset         = Categoery.objects.all()
    serializer_class = CategoerySerializer




    

    






    
    
  



