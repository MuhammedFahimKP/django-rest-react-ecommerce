


from decimal import Decimal


from django.db.models import Prefetch

from django_filters.rest_framework import DjangoFilterBackend


from rest_framework import generics,status
from rest_framework.response import Response 

from rest_framework.request import Request

from rest_framework.filters import OrderingFilter

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import authentication_classes,permission_classes


from .filters import OrderFilter






from ecom.mixins import JWTPermission as JWTAUTHENTICATION 

from shop.models import Cart,CartItem,Product,ProductVariant,ProductVariantImages

from accounts.models import ShippingAddress

from  manager.viewsets  import  CustomPageNumberPagination


from .models import Order,OrderItems
from .serializer import ( 
                         
    OrderCreateSerializer,
    AllOrdersListSerializer,
    PaymentOrderVerifySerializer,
    OrderCancelSerializer,
    OrderListSerializer
)

from .utils import calculate_gst




from .utils import RazorPay

# Create your views here.


                
                
class CalculateTotalAmountAPIView(generics.GenericAPIView) :
    
    
    queryset = Order.objects.all() 
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    
    def get(self,request):
        
        total = 0
        shipping = 0
        
        cart = Cart.objects.filter(user=request.user)
        
        
        
        
        
        
        if cart.exists():
            
            
            cart       = cart.first()
             
            cart_items = CartItem.objects.filter(cart=cart)
            
            for items in cart_items:
                
                total+=items.product.price * items.quantity
            
            gst = calculate_gst(float(total))
            shipping = 0 
            
            if len(cart_items) > 4:
                shipping +=2000
            
            
            data = {
                'gst':gst,
                'shipping':shipping,
                'orginal': total,
                'total': total + Decimal(gst) + Decimal (shipping)
            }
            
            return Response(data,status=status.HTTP_200_OK) 

            
            
        
        
        
        return Response({
            'user':"does't have cart"
        },status=status.HTTP_404_NOT_FOUND)
        

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class OrderCreateListApiView(generics.GenericAPIView):
    
    filterset_class  = OrderFilter
    filter_backends  = [DjangoFilterBackend,OrderingFilter]
    ordering_fields  = ['created','-created','status','-status','payment','-payment']
    pagination_class = CustomPageNumberPagination
    
    
    
    queryset         = Order.objects.prefetch_related(
        
        Prefetch(
            'orders', 
            
                queryset=OrderItems.objects.select_related(
                    'product'  # 'product_variant' FK from OrderItems, 'product' FK from ProductVariant
                ).select_related(
                    'product__product',
                    'product__product__brand',
                    'product__product__categoery',
                    'product__img',  # Assuming 'img' is a related field
                    'product__size',  # Assuming 'size' is a related field
                    'product__color'  # Assuming 'color' is a related field
                )
        ),
    ).all()
    
    
    lookup_field     = 'pk'
    

    
    
    def get_object(self,pk):
        
        try:
            order = Order.objects.get(id=pk)
        
        except  Order.DoesNotExist :
            return Response({'order':'not exist'},status=status.HTTP_404_NOT_FOUND)   
            
        
        return order
    
    
   
   
    
    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
    
    def get(self,request:Request,pk=None) :
        
        
        
       
        if pk is not None:
  
            order_instance  = self.get_object(pk)
    
            serializer      = self.get_serializer_class()
        
            
            serializer      = serializer(order_instance,many=False,context={'request' : request})
            
            

            return Response(serializer.data , status=status.HTTP_200_OK)
          
        
        queryset  = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer_class()
        
        
        
        

        # Apply pagination
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer_class()
            serializer = serializer(page,many=True,context={'request' : request})
            return self.get_paginated_response(serializer.data)

        
        
        serializer = serializer(queryset,many=True,context={'request' : request})
        
        data       = serializer.data 
        
        return Response(data,status=status.HTTP_200_OK)
    
    
    
    def delete(self,request,pk):
        
        
        order_isntance = self.get_object(pk=pk)
        
        for order in order_isntance.orders:
            product         =  order.product 
            product.stock  += order_isntance.product.quantity            
            product.save()
             
            
        
        order_isntance.delete()
        
        return Response({},status=status.HTTP_204_NO_CONTENT)
        
        
     
    
    
    def post(self, request):
        
        serializer = self.get_serializer_class()
        
      
        
        serializer = serializer(data=request.data)
        
        
        
        
        
        if serializer.is_valid(raise_exception=True) :
            
            user = request.user
            cart = Cart.objects.filter(user=user)
            if not cart.exists():
                return Response({'cart':'cart is empty'})
            cart = cart.first()
            cart_items = CartItem.objects.filter(cart=cart)
            
            if not cart_items:
                return Response({'error': 'No items in cart'}, status=status.HTTP_400_BAD_REQUEST)
            
            total = 0
            order_items = []
            shipping_address =  ShippingAddress.objects.get(id=serializer.data['shipping_address'])
            order = Order(
                        
                        #setting the current user                
                        user                  = request.user,
                        
                        #setting shiping address
                        address               = shipping_address,
                        
                        
                        total_amount          = 0.0,
                        #setting status 
                        status                = 'Placed',
                        
                        #setting payment type 
                        payment               = serializer.data['payment_type'],
                        payment_transation_id = None,
                        payment_status        = 'Pending',             
            )
            
            
            for item in cart_items:
                product = item.product
                if product.stock < item.quantity:
                    return Response({ 'product': {
                            item.id:f'out stock only {item.product.stock}',
                        
                        }}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                total += item.quantity * product.price
                order_items.append(OrderItems(product=product, quantity=item.quantity, order=None))

            
            gst = calculate_gst(float(total))  
            orginal = total
            total = Decimal(gst) + total
            order.total_amount = total
            order.save()
            
            
            

            for item in order_items:
                item.order = order 
                item.save()
                product.stock -= item.quantity
                product.save()
            

            

            if order.payment == 'RAZOR PAY':
                
                payment = RazorPay.create_payment_order(amount=total , currency='INR' ) 
                
                
                
            
                return Response({
                    'order_id': order.id, 
                    'razorpay': payment, 
                    'amount': total,
                    'orginal':orginal,
                    
                },status=status.HTTP_201_CREATED)
            
            cart.delete()    

            return Response({
                
                'order_id':order.id,
                'amount':total,
                'orginal':orginal,
                
            },status=status.HTTP_201_CREATED)             
    
    
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            return OrderCreateSerializer
        
      
        
       
        
        
        
        return OrderListSerializer
            
    
    
  
    
    
    
    
    
    
    
    
    """
        
        patch request only used to user oder canceltion functionality 
        
    """
    
    def patch(self,request,pk):

        
     

        """
        checking serializer is valid if serialzer is not valid it will send serailizor error with http 400   

        """    
    
            
            
        order_instance =  self.get_object(pk) 
       
       
        if  order_instance.status == 'Cancelled' :
            
            return Response({'status':'already canceled'},status=status.HTTP_409_CONFLICT)
        
        
        if order_instance.status == 'Delivered'  :
    
            return Response({'status':'order is delivered you cant cancel the order'} , status=status.HTTP_400_BAD_REQUEST )
        
        for order in order_instance.orders:
            
            product        = order_instance.product

            product.stock += order.quantity
            
            product.save()
            
            
        order_instance.status = 'Cancelled'
        
        order_instance.save()        
        
        return Response({'status':order_instance.status,'expected_delivery':order_instance.expected_delivery},status=status.HTTP_202_ACCEPTED) 
         
        


class OrderDeleteAPIView(generics.DestroyAPIView):
    
    
    queryset = Order.objects.all()




class OrderCheckView(generics.GenericAPIView) :
    
    def post(self,request) -> Response:
        
        data = request.data 
        
        print(data)
        
        
        return Response(data,status=status.HTTP_200_OK)
        
    
        
        
        
        

    
    
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])    
class PaymentOrderVerifyApiView(generics.GenericAPIView):
    
    serializer_class = PaymentOrderVerifySerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        cart        = Cart.objects.filter(user=reqeust.user)
        
        cart        = cart.first()
        
        
        if serailizer.is_valid(raise_exception=True):
            
            check = RazorPay.verfiy_payment(

                order_id   = serailizer.validated_data['payment_order_id'],
                payment_id = serailizer.validated_data['payment_id'],
                signature  = serailizer.validated_data['signature'],
    
            )
            
            if check != False:
                
                order = serailizer.validated_data.get('order_id')
                
                order.payment_status =  'Paid'
                
                order.payment_transation_id = serailizer.validated_data.get('payment_id')
                
                
                
                order.save()
                
                cart.delete()

                return Response({'succes':check},status.HTTP_200_OK)
    
            return Response({"error":"wrong  payment_id or order id or verfication id "},status=status.HTTP_400_BAD_REQUEST)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
        

                

    
    
    
    
    
    
            
        
            
            
            
         
        