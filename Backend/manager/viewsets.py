from ecom.mixins import JWTPermission
from rest_framework import generics
from rest_framework import viewsets,response,status
from rest_framework.parsers import MultiPartParser,FormParser
from .serializers import (   

    AdminCategoerySerializer,
    AdminBrandSerializer,
    AdminColorSerializer,
    AdminSizeSerializer,
    AdminProductSerializer,
    AdminProductVariantSerializer,
    AdminProductVarintListSerializer,
)
from shop.models import (
    Categoery,
    Brand,
    Color,
    Size,
    Product,
    ProductVariant
)

from .permissions import AdminOnly
from rest_framework.response import Response


class AdminCategoeryViewset(JWTPermission,viewsets.ModelViewSet):
    
    permission_classes = [AdminOnly] 
    queryset           = Categoery.objects.all()
    serializer_class   = AdminCategoerySerializer
    lookup_field       ='pk'


    def destroy(self,request,*args, **kwargs):
        super().destroy(request,*args,**kwargs)
        return response.Response({
            'message':'categoery deleted success fully'    
        },status=status.HTTP_204_NO_CONTENT)
    

class AdminBrandViewset(JWTPermission,viewsets.ModelViewSet):

    permission_classes = [AdminOnly]
    queryset           = Brand.objects.all()
    serializer_class   = AdminBrandSerializer
    lookup_field       = 'pk'


class AdminColorViewset(JWTPermission,viewsets.ModelViewSet):

    permission_classes = [AdminOnly]
    queryset           = Color.objects.all()
    serializer_class   = AdminColorSerializer
    lookup_field       ='pk'



class AdminSizeViewset(JWTPermission,viewsets.ModelViewSet):

    permission_classes = [AdminOnly]
    queryset           = Size.objects.all()
    serializer_class   = AdminSizeSerializer
    lookup_field       ='pk'    


class AdminProductViewSet(JWTPermission,viewsets.ModelViewSet):

    permission_classes = [AdminOnly]
    queryset           = Product.objects.all()
    serializer_class   = AdminProductSerializer
    lookup_field       = 'pk'



class AdminProductVariantViewSet(viewsets.ModelViewSet):

    # permission_classes = [AdminOnly]
    queryset           = ProductVariant.objects.all()
    
    lookup_field       = 'pk'


    def get_serializer_class(self):
        if self.action == "CREATE":
            return AdminProductVariantSerializer
        return AdminProductVarintListSerializer



  


    
