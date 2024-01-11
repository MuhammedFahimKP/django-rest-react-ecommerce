from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response 
from .models import Order,OrderItems
from .serializer import ( 
                         
    OrderCreateSerializer,
    OrderListSearializer,
    PaymentOrderVerifySerializer,
    OrderCancelSerializer,
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
    
    
    
    
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            return OrderCreateSerializer
        
        elif self.request.method == 'PATCH':
            return OrderCancelSerializer
        
        return OrderListSearializer
            
    
    
    def get(self, request):
        
        serializer =  self.get_serializer(self.get_queryset(),many=True)
        
        return Response(serializer.data)
    
    
    
    
    
    def post(self,request,*args, **kwargs):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        

        

        
        if serializer.is_valid(raise_exception=True):
            
            """
            
            -> getting the data from serailizer
            
             
            """
        
            
            
            # seeting the payment staus pending                
            payment_status = 'Pending'
            
            
            #create order object based on the serializer data 
            
            order = Order.objects.create(
                    
                    #setting the current user                
                    user                  = request.user,
                    
                    #setting shiping address
                    address               = serializer.validated_data['shipping_address'],
                    
                    
                    total_amount          = 0.0,
                    #setting status 
                    status                = 'Placed',
                    
                    #setting payment type 
                    payment               = serializer.validated_data['payment_type'],
                    payment_transation_id = None,
                    payment_status        = payment_status,             
            )
                
            
            #getting productlist  from serilizer 
            
            products : list[object]     = serializer.validated_data.get('product',None)
            
            
            #getting quantity dictionary from serailizer 
            
            quantity : dict[str,int]    = serializer.validated_data.get('quantity',None) 
            
             
            total_amount : float = 0.0
                
                
            #create an oder items for append  model objects list for run if any problems there and decreament the product stock
            orderitems = []
            
            
            
            #iterate through product
            
            for prd in products:
                
                #getting the item quantity from dictionary if it deosnt exist it will be one
                
                item_quantity = quantity.get(str(prd.id),1)
                    
                    
                    
                #product is not avalible in  stock
                if prd.stock == 0 :
                    
                    #deleteing the entire order and orderitems and break entire the order process
                    order.delete()
                    
                    #sending bad request response
                    return Response({f"{prd.product.name}":"is not avaible" } , status=status.HTTP_400_BAD_REQUEST )
                
                
                #ordering quantiy > product  stock 
                elif prd.stock < item_quantity :
                    
                    
                    #deleteing the entire order and orderitems and break entire the order process
                    
                    order.delete()   
                    
                    
                    #sending bad request response            
                    return Response({f"{prd.product.name}":f"is only available in {item_quantity} " } , status=status.HTTP_400_BAD_REQUEST )
                
                else :
                    
                    
                    
                    #orther wise create order 
                
                    orderitem = OrderItems.objects.create(
                        order   = order,
                        product = prd,
                        quantity = item_quantity
                    
                    )   
                    
                    
                    
                    #append the order item to to orderitem list 
                    orderitems.append(orderitem)
                    
                    #getting total amount
                    total_amount += float(prd.price) * item_quantity
                
                #updating total amount every iteration 
                order.total_amount = total_amount 
                order.save()
                             
            #if all product have stocks  then we need to decreatment the stocks from db according to  orderitem quantity
                            
            for item in orderitems:
                
                product        = item.product
                product.stock -= item.quantity
                product.save()
                
                
                    
                
                
                
                
             
            
            
            #creating payment oder if payment type is RAZOR PAY
            
            
            if serializer.validated_data['payment_type'] == 'RAZOR PAY':
                
                #requesting razor pay client for getting  response
                payment = RazorPay.create_payment_order(amount=total_amount,currency="INR")
                   
                
                
                #sending payment order detials along with response    
                return Response({
                     
                     "success"   : "order created",
                     "Payment Details" : payment,
                     "order_id" : order.id,
                     
                },status=201)
            
            
            
            return Response({"success order created"},status=201)
        
        return Response(serializer.errors,status=404)
    
    
    """
        
        patch request only used to user oder canceltion functionality 
        
    """
    
    def patch(self,request):

        
        
        serializer = self.get_serializer_class()
    
        serializer = serializer(data=request.data,context={'request':request})

        """
        checking serializer is valid if serialzer is not valid it will send serailizor error with http 400   

        """    
        if serializer.is_valid(raise_exception=True):
            
            
            
            order = serializer.validated_data['order_id']
            order.status = 'Cancelled'
            order.save()            
            

        
            return Response({
                'Message':'Oder Canceld',
            },status=status.HTTP_202_ACCEPTED) 
         
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 


        
        
        
        
        
        
        

    
    
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
    
    
        

                

    
    
    
    
    
    
            
        
            
            
            
         
        