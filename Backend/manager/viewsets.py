
from rest_framework.exceptions import NotFound
from rest_framework import viewsets,response,status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.decorators import action

from django_filters.rest_framework.backends import DjangoFilterBackend

from ecom.mixins import JWTPermission

from .serializers import (   

    AdminCategoerySerializer,
    AdminBrandSerializer,
    AdminColorSerializer,
    AdminSizeSerializer,
    
    AdminProductViewSerailizer,
    AdminProductCreateSerailizer,
    AdminProductUpdateSerailizer,
    AdminProductVarationSerializer,
    AdminProductVariantSerializer,
    AdminProductVarintListSerializer,
)
from shop.models import (
    Categoery,
    Brand,
    Color,
    Size,
    Product,
    ProductVariantImages,
    ProductVariant
)

from .permissions import AdminOnly

from  .filters import AdminProductFilterSet

from .utils import is_valid_uuid





class AdminCategoeryViewset(JWTPermission,viewsets.ModelViewSet):
    
     
    queryset           = Categoery.objects.all()
    serializer_class   = AdminCategoerySerializer
    lookup_field       ='pk'


    def destroy(self,request,*args, **kwargs):
        super().destroy(request,*args,**kwargs)
        return response.Response({
            'message':'categoery deleted success fully'    
        },status=status.HTTP_204_NO_CONTENT)
    

class AdminBrandViewset(JWTPermission,viewsets.ModelViewSet):

    
    queryset           = Brand.objects.all()
    serializer_class   = AdminBrandSerializer
    lookup_field       = 'pk'


class AdminColorViewset(JWTPermission,viewsets.ModelViewSet):

    
    queryset           = Color.objects.all()
    serializer_class   = AdminColorSerializer
    lookup_field       ='pk'
    
    
    
    
        
        
        
        
        
        
        
                

    



class AdminVariationViewset(JWTPermission,viewsets.ModelViewSet):
    
    
    queryset           = ProductVariantImages.objects.all()
    serializer_class   = AdminProductVarationSerializer
    lookup_field       = 'pk'
    
    
    @action(detail=True,methods=['get'])
    def get_all_varions(self,request):
        return Response({'detail':'Not Found'},status=404)
    
    
    
    @action(detail=True,methods=['get'])
    def get_variation_for_the_product(self,request,pk):
        
        print('hai')
        
        if pk == '':
            
            raise NotFound()
        
        
        queryset = self.queryset.filter(image_id__startswith=pk)
        
        serializer = self.get_serializer_class()
        serializer = serializer(data=queryset)
        
        return self.get_paginated_response(serializer.data)
        
    
        
        
        
    
    
    
    

class AdminSizeViewset(JWTPermission,viewsets.ModelViewSet):

    
    queryset           = Size.objects.all()
    serializer_class   = AdminSizeSerializer
    lookup_field       ='pk'    
    

    
    


class AdminProductViewSet(viewsets.ModelViewSet):
    
    
    
    
    
    
    
    # 
    queryset           = Product.objects.all().prefetch_related('categoery','brand','variants').all()
    parser_classes     = (MultiPartParser, FormParser)
    filter_backends    = [DjangoFilterBackend]
    filterset_class    = AdminProductFilterSet
    serializer_class   = None
    lookup_field       = 'pk'
    
    
    def get_serializer_class(self):
        
        if  self.request.method == 'POST':
            
            return  AdminProductCreateSerailizer
        
        if self.request.method == 'PATCH':
            return AdminProductUpdateSerailizer
        
        return AdminProductViewSerailizer
    
    
    @action(detail=True,methods=['post'])
    def create_product(self,request) -> Response:
        
        serializer =  self.get_serializer_class()
        
        serializer = serializer(data=request.data)
        
      
        
        if serializer.is_valid(raise_exception=True) :
            
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True,methods=['patch'])
    def update_product(self,request,pk=None) -> Response:
        
        pk         = is_valid_uuid()
        
        instance = self.get_queryset().filter(id=pk)
        
        if not instance.exist():
            raise NotFound()
         
        instance   = instance.first()    
        serializer =  self.get_serializer_class()
        serializer =  serializer(instance,data=request.data,context={'request':request})

        if serializer.is_valid(raise_exception=True) :
            
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        return Response(serializer.errors , status=status.HTTP_400_BAD_REQUEST)
    
    
    



class AdminProductVariantViewSet(JWTPermission,viewsets.ModelViewSet):

    # 
    queryset           = ProductVariant.objects.all()
    
    lookup_field       = 'pk'


    def get_serializer_class(self):
        
        if self.request.method == "POST":
            return AdminProductVariantSerializer
        
        return AdminProductVarintListSerializer
    

    def post(self,request,token):
        serializer = self.get_serializer_class()

        print('hai')

        serializer = serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):

        
            

            return Response({
                'message':f'hi {'sdsj'}  your account activated successfully ',
            },status=status.HTTP_200_OK) 
         # other wise it will send a 400 http response with serializer error
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 



  


    
