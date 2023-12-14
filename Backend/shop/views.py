from rest_framework import generics,status
from ecom.mixins import JWTPermission as JWT_Permssion_mixin
from .models import Cart
from rest_framework.response import Response
from .serializers import CartSerializer
class CartItemCreateApiView(JWT_Permssion_mixin,generics.ListCreateAPIView):

    serializer_class = CartSerializer
    queryset         = Cart.objects.all()


    def create(self,request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors,status=404)
            
    def get_queryset(self,*args, **kwargs):
            qs = super().get_queryset(*args,**kwargs) 
            return qs.filter(user=self.request.user) 
                

    
    




