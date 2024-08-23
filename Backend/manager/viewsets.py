
from django.db.models import Prefetch
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import EmptyResultSet
from django.contrib.auth import get_user_model

from rest_framework.exceptions import NotFound
from rest_framework import viewsets,response,status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import  LimitOffsetPagination,PageNumberPagination
from rest_framework.filters import OrderingFilter,SearchFilter










from django_filters.rest_framework.backends import DjangoFilterBackend


from checkouts.models import Order,OrderItems
from checkouts.filters import OrderFilter

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
    AdminOrderListSerailizer,
    AdminOrderRetriveSerializer,
    AdminOrderUpdateSerializer,
    AdminUserSerializer,
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

from  .filters import AdminProductFilterSet,AdminUserFilterSet

from .utils import is_valid_uuid





USER = get_user_model()

class CustomPageNumberPagination(PageNumberPagination):

    page_size_query_param = 'limit'
    page_query_param = 'page'
    
    



    
    
    
    

    









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
        
    
        
        
        
    
    
    
    


    
    
class CustomLimitOffsetPagination(LimitOffsetPagination):
    def paginate_queryset(self, queryset, request, view=None):
        self.limit = self.get_limit(request)
        self.offset = self.get_offset(request)
        if self.limit is None:
            return None

        try:
            self.count = self.get_count(queryset)
            self.request = request
            if self.count > 0 and self.offset >= self.count:
                # Adjust the offset if it exceeds the total count
                self.offset = max(0, self.count - self.limit)
            self.display_page_controls = self.count > self.limit

            return list(queryset[self.offset:self.offset + self.limit])
        except EmptyResultSet:
            # Handle the case where the queryset is empty
            self.count = 0
            self.request = request
            self.display_page_controls = False
            return []

    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
        
class CustomPagination(LimitOffsetPagination):
     
     
    default_limit=1
    max_limit=8

           

class AdminProductViewSet(viewsets.ModelViewSet):
    
    
    
    
    
    
    
    
    queryset           = Product.objects.all().prefetch_related('categoery','brand','variants').all()
    parser_classes     = (MultiPartParser, FormParser)
    filter_backends    = [DjangoFilterBackend,OrderingFilter,SearchFilter]
    filterset_class    = AdminProductFilterSet
    serializer_class   = None
    lookup_field       = 'pk'
    
    ordering_fields  = ['created','updated','is_active','name']   
    pagination_class =  CustomPageNumberPagination
    
    search_fields = ['name', 'variants__size__name','brand__name','categoery__name','variants__color__name']
    ordering_fields  = ['created','updated','is_active','variants__price']
    
    
    
    
    
    
        
        
        
        
        
                

    
    
        
    
        
        

    
   


    
    
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
    




    


class AdminCategoeryViewset(JWTPermission,viewsets.ModelViewSet):
    
     
    queryset           = Categoery.objects.all()
    serializer_class   = AdminCategoerySerializer
    lookup_field       ='pk'
    
    pagination_class   =  CustomPageNumberPagination
    
    parser_classes     = (MultiPartParser, FormParser)
    
    
    filter_backends    = [SearchFilter,OrderingFilter] 
    search_fields      = ['name']
    ordering_fields    = ['created','updated','-created' , '-updated']


    def destroy(self,request,*args, **kwargs):
        super().destroy(request,*args,**kwargs)
        return response.Response({
            'message':'categoery deleted success fully'    
        },status=status.HTTP_204_NO_CONTENT)
    

class AdminBrandViewset(JWTPermission,viewsets.ModelViewSet):

    
    queryset           = Brand.objects.all()
    serializer_class   = AdminBrandSerializer
    lookup_field       = 'pk'
    
    filter_backends    = [SearchFilter,OrderingFilter] 
    search_fields      = ['name']
    ordering_fields    = ['created','updated','-created' , '-updated']
    
    
    
    
    pagination_class =  CustomPageNumberPagination


class AdminColorViewset(JWTPermission,viewsets.ModelViewSet):

    filter_backends    = [SearchFilter,OrderingFilter] 
    search_fields      = ['name']
    ordering_fields    = ['created','updated','-created' , '-updated']
    
    
    queryset           = Color.objects.all()
    serializer_class   = AdminColorSerializer
    lookup_field       ='pk'
    
    
    
    
        
    pagination_class =  CustomPageNumberPagination


class AdminSizeViewset(JWTPermission,viewsets.ModelViewSet):

    
    filter_backends    = [SearchFilter,OrderingFilter] 
    search_fields      = ['name']
    ordering_fields    = ['created','updated','-created' , '-updated']
    
    queryset           = Size.objects.all()
    serializer_class   = AdminSizeSerializer
    lookup_field       ='pk'    
    
    pagination_class =  CustomPageNumberPagination

class AdminOrderAPIViewSet(viewsets.ModelViewSet):
    
    # permission_classes = [AdminOnly]
    queryset           = Order.objects.select_related('user').all()
    lookup_field       = 'pk'
    serializer_class   = None
    lookup_value_regex = r'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}'
    http_method_names  = ['get','patch','delete']
    filterset_class    = OrderFilter
    filter_backends    = [DjangoFilterBackend,OrderingFilter]
    pagination_class   = CustomPageNumberPagination
    ordering_fields    = ['created','updated','-created' , '-updated']
    
    
    
    
    
    
    def get_object(self,pk:str):
        
        try:
            instance = Order.objects.prefetch_related( 'user','address', Prefetch('orders',queryset=OrderItems.objects.select_related(
                    'product'  # 'product_variant' FK from OrderItems, 'product' FK from ProductVariant
                ).select_related(
                    'product__product',
                    'product__product__brand',
                    'product__product__categoery',
                    'product__img',  # Assuming 'img' is a related field
                    'product__size',  # Assuming 'size' is a related field
                    'product__color'  # Assuming 'color' is a related field
                ))).get(id=pk)
            
            return instance
        
        except Order.DoesNotExist:    
            
            raise NotFound()
        

        
        
    
    def get_serializer_class(self):
        
        
        if self.action == 'partial_update':
            
            return AdminOrderUpdateSerializer
    
        
        if self.action =='retrieve':
            
    
            
            return AdminOrderRetriveSerializer
        
        
        return AdminOrderListSerailizer    
   
    
    
    def partial_update(self, request, *args, **kwargs):
        
        
        pk = kwargs.get('pk')
         
         
        if pk :
            
            instance   = self.get_object(pk)
            serializer = self.get_serializer_class()
            serializer = serializer(data=request.data)
            
            if serializer.is_valid(raise_exception=True) :
                
                _status = serializer.data['status']
                
                if _status == 'Delivered'  and  instance.status == 'place' and instance.payment == 'RAZOR PAY' and instance.payment_status == 'Pending' :
                    
                    return Response({'payment':'payment not done'},status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                
                if instance.status == 'Placed' and _status in ['Delivered', 'Cancelled']:
                    
                    instance.status = _status 
                    
                    instance.save()
                    
                    return Response({'status':instance.status},status=status.HTTP_200_OK if _status == 'Delivered' else status.HTTP_202_ACCEPTED ) 
                
                return Response({'status':'give a valid status accoridng to current order status'},status=status.HTTP_400_BAD_REQUEST)
            
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
        return Response({'detail':'not found'},status=status.HTTP_404_NOT_FOUND)
        
         
    
    def retrieve(self, request, *args, **kwargs):
        
        pk = kwargs.get('pk')
        
        
        #getting the
        
        if pk :
            
            instance   = self.get_object(pk)
            serializer = self.get_serializer_class()
            serializer = serializer(instance,context={'request':self.request})
            
            

            return  Response(serializer.data,status=status.HTTP_200_OK)      

        return Response({'detail':'not found'},status=status.HTTP_404_NOT_FOUND)
    
    
class AdminUserViewSet(JWTPermission,viewsets.ModelViewSet):
    
    
    
    

    
    def get_queryset(self):
        
        if self.request.user != 'AnonymousUser'  :
            
            user = self.request.user
            
            qs = super().get_queryset().exclude(id=user.id)
        
            return qs
        
        return super().get_queryset()
    
    
    
    serializer_class   = AdminUserSerializer
    
    queryset           = USER.objects.all()    
    
    filterset_class    = AdminUserFilterSet 

    filter_backends    = [OrderingFilter ,DjangoFilterBackend,SearchFilter]
    
    
    search_fields      = ['email','first_name','last_name'] 
    
    
    pagination_class   = CustomPageNumberPagination
    
    
    
    lookup_value_regex = r'[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}'
    
    ordering_fields    = ['date_joined','-date_joined','last_login' , '-last_login' , 'auth_provider' , '-auth_provider', '-is_active' , '-is_active' ]
    


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

    

        serializer = serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):

        
            

            return Response({
                'message':f'hi {'sdsj'}  your account activated successfully ',
            },status=status.HTTP_200_OK) 
         # other wise it will send a 400 http response with serializer error
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 



  


    
