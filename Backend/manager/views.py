

from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.parsers import FormParser,MultiPartParser

from shop.models import ProductVariantImages,ProductVariant
from .serializers import (
    
    AdminProductVarationSerializer,
    AdminSizeVariaitonSerailizer,
    AdminSizeVariationCreateSerailizer,
    AdminColorVariationSerializer,
)
from .utils import is_valid_uuid



class GetVarationsForProduct(generics.GenericAPIView): 
    
    serializer_class = AdminProductVarationSerializer
    queryset         = ProductVariantImages.objects.all()
    
    def get(self,request,pk=None):
               
        serializer = self.get_serializer_class()
        data       = self.get_queryset().filter(img_id__startswith=pk)
        if len(data) == 0 : 
            data = []
        
        serializer = serializer(data,many=True,context={'request':request}) 
        
        return Response(serializer.data,status=status.HTTP_200_OK)

class GetSingleProductVariatonImages(generics.GenericAPIView):
    
    serializer_class = AdminProductVarationSerializer
    queryset         = ProductVariantImages.objects.all()
    lookup_field     = 'pk'  
    
    
    
    
    def get(self,request,pk=None):
        
        
        
        
         
        pk         = is_valid_uuid(pk)     
        serializer = self.get_serializer_class()
        data       = self.get_queryset().filter(id=pk)
        
        if len(data) == 0 :
            raise NotFound()
        
        serializer = serializer(data[0],context={'request':request})
        
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
    
class GetPerticualerSizesOfColor(generics.GenericAPIView):
    
    queryset         = ProductVariant.objects.all()
    serializer_class = AdminSizeVariaitonSerailizer
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            
            return AdminSizeVariationCreateSerailizer

        
        return AdminSizeVariaitonSerailizer
    
    
    def get(slef,request,pk=None):
        
        pk            = is_valid_uuid(pk)
        product_color = ProductVariantImages.objects.filter(id=pk) 
        
        if len(product_color) == 0:
            raise NotFound()
    
    
        data  = slef.get_queryset().filter(img=product_color[0])
        
        if len(data) == 0:
                    
            return Response(data,status=status.HTTP_200_OK)
        
        
        serializer = slef.get_serializer_class()     
        serializer = serializer(data,many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    
    def patch(self,request,pk=None):
        
        pk       = is_valid_uuid(pk)
        instance = self.get_queryset().filter(id=pk)
        
        if len(instance) == 0 :
            raise NotFound() 
        
        instance   = instance.first()

        serializer = self.get_serializer_class()
        
        serializer = serializer(instance,data=request.data)     
        
        
        if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk=None):
        
        pk       = is_valid_uuid(pk)
        instance = self.get_queryset().filter(id=pk)
        instance = instance.first()
        instance.delete()
        
        return Response({},status=status.HTTP_204_NO_CONTENT)
        
    
        
class SizeVariationCreateAPIview(generics.GenericAPIView) :
    serializer_class = AdminSizeVariationCreateSerailizer
    
    def post(self,request):
        
        
        
        serializer =  self.get_serializer_class()
        
        serializer = serializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
          
class ColorVarationCreateUpdateView(generics.GenericAPIView) :
   
   serializer_class = AdminColorVariationSerializer
   
   parser_classes   = [FormParser,MultiPartParser]
   
   
   def post(self,request):
       
       serializer  = self.get_serializer_class()
       serializer  = serializer(data=request.data,context={'request':request})
        
       if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
       
       return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
       
        
        


