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
from .serializers import  CartItemSerializer,WishtListItemSerializer,ProductSerilizer




class CartItemsListCreateApiView(JWT_Permssion_mixin,generics.ListCreateAPIView):

    serializer_class = CartItemSerializer
    queryset         = CartItem.objects.all()


    def create(self,request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors,status=404)
    



            
    def get_queryset(self,*args, **kwargs):

            cart = get_or_none(class_model=Cart,user=self.request.user)

            if cart is not None :
                qs = super().get_queryset(*args,**kwargs)
                return qs.filter(cart=cart)
        
            qs = CartItem.objects.none()
            return  qs
                

class CartItemReteriveUpdateDestroyAPIView(JWT_Permssion_mixin,generics.RetrieveUpdateDestroyAPIView):

     serializer_class = CartItemSerializer
     queryset         = CartItem.objects.all()
     lookup_field     = 'pk'     

     def put(self, request, pk):
        cart_item = CartItem.objects.get(pk=pk)
        serializer = CartItemSerializer(cart_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
     
    
   


class WishListItemsListCreateApiView(JWT_Permssion_mixin,generics.ListCreateAPIView):

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


class ListProductAPIView(generics.ListAPIView):

    serializer_class = ProductSerilizer
    queryset         = Product.objects.all()
     

    def get_queryset(self,*args, **kwargs):

       
         
        categoery  =  self.kwargs.get('categoery',None)
        
        categoery  =  get_or_none(class_model=Categoery,slug=categoery)
        
        
        


        if categoery is not None:
             
             qs = super().get_queryset(*args, **kwargs)

             return qs.filter(categoery=categoery)

        qs = Product.objects.all()             
        return qs 
    

class ProductRetriveApiView(generics.RetrieveAPIView):

     serializer_class = ProductSerilizer 
     queryset         = Product.objects.all()  
     lookup_field     = 'slug'

     


     
     


