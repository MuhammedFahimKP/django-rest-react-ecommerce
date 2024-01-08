from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import OrderingFilter



from rest_framework import generics,status
from ecom.mixins import JWTPermission as JWT_Permssion_mixin
from .models import (
     
     Cart,
     CartItem,
     WishList,
     WishListItem,
     Product,
     Categoery,

)


from rest_framework.response import Response
from .utils import get_or_none
from .serializers import  CartItemSerializer,WishtListItemSerializer,ProductSerilizer,CategoerySerializer
from .filters import ProductFilterSet




class CartItemsListCreateApiView(JWT_Permssion_mixin,generics.ListCreateAPIView):

    
    """

    used jwt authentication class and  to ftech cartitems of current user
    
    """


    serializer_class = CartItemSerializer
    queryset         = CartItem.objects.all()


    def create(self,request):
        """

        overiding the create method  anf


        """

        #getting serializer class and sending the requested data
        serializer = self.get_serializer(data=request.data)
        

        """

        if data send to serializer is valid then we need to perform create 

        else we need to raise the validation error


        """   
        if serializer.is_valid(raise_exception=True):
            
            self.perform_create(serializer)

            headers = self.get_success_headers(serializer.data)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors,status=404)
    



            
    def get_queryset(self,*args, **kwargs):
            
            #getting the cart of current user if user does not have cart it return a None 

            cart = get_or_none(class_model=Cart,user=self.request.user)



        
            """

            user have cart then filtering the cartitems are related to cart 
            otherwise returns a empty list

            """
            if cart is not None :

                qs = super().get_queryset(*args,**kwargs)
                return qs.filter(cart=cart)
        
            qs = CartItem.objects.none()
            return  qs
                

class CartItemReteriveUpdateDestroyAPIView(JWT_Permssion_mixin,generics.RetrieveUpdateDestroyAPIView):

     serializer_class = CartItemSerializer
     queryset         = CartItem.objects.all()
     lookup_field     = 'pk'     

     """

            getinging  the cartitem updating the
            using put 
     """

     
     
     
    
   


class WishListItemsListCreateApiView(JWT_Permssion_mixin,generics.ListCreateAPIView):
    
    """

    used jwt authentication class and  to ftech cartitems of current user
    
    """


    serializer_class = WishtListItemSerializer
    queryset         = WishListItem.objects.all()

    


    def create(self,request):

        serializer = self.get_serializer(data=request.data)
        





        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors,status=404)
    



            
    def get_queryset(self,*args, **kwargs):
            
            #getting the wishlist  of current user if user does not have wishlist it return a None

            
            """

            user have wishlist then filtering the wishlistitems are related to wishlist 
            otherwise returns empty list

            """

            wishlist = get_or_none(class_model=WishList,user=self.request.user)

            if wishlist is not None :
                qs = super().get_queryset(*args,**kwargs)
                return qs.filter(wishlist=wishlist)
        
            qs = WishListItem.objects.none()
            return  qs
                

class WishListItemReteriveUpdateDestroyAPIView(JWT_Permssion_mixin,generics.RetrieveUpdateDestroyAPIView):

     serializer_class = WishtListItemSerializer
     queryset         = WishListItem.objects.all()
     lookup_field     = 'pk'     

     
     """

            getinging  the cartitem updating the
            using put 
     """


class ListProductAPIView(generics.ListAPIView):

    serializer_class = ProductSerilizer
    queryset         = Product.objects.all()
    
    
    
    
    
    
    filter_backends  = [DjangoFilterBackend,OrderingFilter]
    filterset_class  =  ProductFilterSet  
    ordering_fields  = ['created','updated','is_active']   
    
    """
    
    pagination_class for sort the product 
    
    """ 
    pagination_class = LimitOffsetPagination
    pagination_class.page = 100
    
     

    
    

class ProductRetriveApiView(generics.RetrieveAPIView):

     serializer_class = ProductSerilizer 
     queryset         = Product.objects.all()  
     lookup_field     = 'slug'



class CateogoeryListApiView(generics.ListAPIView):
     
     serializer_class = CategoerySerializer
     queryset         = Categoery.objects.all()
     
     


     
     


