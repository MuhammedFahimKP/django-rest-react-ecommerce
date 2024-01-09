from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response 
from .models import Order,OrderItems
from .serializer import ( 
                         
    OrderCreateSerializer,
    OrderListSearializer,
    PaymentOrderVerifySerializer 
)


from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import authentication_classes,permission_classes

from ecom.mixins import JWTPermission as JWTAUTHENTICATION 
from .utils import RazorPay

# Create your views here.


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class OrderCreateListApiView(generics.GenericAPIView):
    
    
    queryset         = Order.objects.all()
    
    
    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
    
    
    # def get_serializer(self, *args, **kwargs):
    #     return super().get_serializer(*args, **kwargs)
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            return OrderCreateSerializer
        
        return OrderListSearializer
            
    
    
    def get(self, request, format=None):
        
        serializer =  self.get_serializer(self.get_queryset(),many=True)
        
        return Response(serializer.data)
    
    
    
    
    
    def post(self,request,*args, **kwargs):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        


        
        if serializer.is_valid(raise_exception=True):
            
            
            try:
            
                transation_id  = serializer.validated_data.get('payment_transation_id',None)
                payment_status = 'Pending'
                order = Order.objects.create(
                    user                  = request.user,
                    address               = serializer.validated_data['shipping_address'],
                    total_amount          = 0.0,
                    status                = 'Placed',
                    payment               = serializer.validated_data['payment_type'],
                    payment_transation_id = transation_id,
                    payment_status        = payment_status,             
                )
                
            
                products : list[object]     = serializer.validated_data.get('product',None)
                quantity : dict[str,int]    = serializer.validated_data.get('quantity',None) 
            
                total_amount : float = 0.0
                
                
            except ValueError as e:
            
                    return Response(
                        {"Value error":f"Invalid input, use an integer : {str(e)}"},
                        status= status.HTTP_400_BAD_REQUEST
                    )
            
            for prd in products:
                
            
                
                
                
                item_quantity = quantity.get(prd.id,1)
                
                orderitem = OrderItems.objects.create(
                    order   = order,
                    product = prd,
                    quantity = item_quantity
                
                )                
                total_amount += float(prd.price) * item_quantity
             
            order.total_amount = total_amount 
            order.save()
            
            if serializer.validated_data['payment_type'] == 'RAZOR PAY':
                
                payment = RazorPay.create_payment_order(amount=total_amount,currency="INR")
                    
                return Response({
                     
                     "success"   : "order created",
                     "Payment Details" : payment,
                     "order_id" : order.id,
                     
                },status=201)
            
            
            
            return Response({"success order created"},status=201)
        
        return Response(serializer.errors,status=404)
  



    
    
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])    
class PaymentOrderVerifyApiView(generics.GenericAPIView):
    
    serializer_class = PaymentOrderVerifySerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        
        if serailizer.is_valid(raise_exception=True):
            
            check = RazorPay.verfiy_payment(

                order_id   = serailizer.validated_data['payment_order_id'],
                payment_id = serailizer.validated_data['payment_id'],
                signature  = serailizer.validated_data['signature'],
    
            )
            
            if check is None:
                
                order = serailizer.validated_data.get('order_id')
                
                order.payment_status =  'Paid'
                
                order.payment_transation_id = serailizer.validated_data.get('payment_id')
                
                order.save()

                return Response(check.data,status.HTTP_200_OK)
    
            return Response({"error":"wrong  payment_id or order id or verfication id "},status=status.HTTP_400_BAD_REQUEST)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
        

                

    
    
    
    
    
    
            
        
            
            
            
         
        