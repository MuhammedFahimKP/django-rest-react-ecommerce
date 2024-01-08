from rest_framework import generics,status
from rest_framework.response import Response
from .serializers import PaymentOrderCreateSerializer,PaymentOrderVerifySerializer
from ecom.mixins import JWTPermission as JWTAUTHENTICATION 
from .main import RazorPay

class PaymentOrderCreateApiView(JWTAUTHENTICATION,generics.GenericAPIView):
    
    serializer_class = PaymentOrderCreateSerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        
        if serailizer.is_valid(raise_expection=True):
            
            serailizer.save()
    
            return Response(serailizer.data,status=status.HTTP_201_CREATED)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    
class PaymentOrderVerifyApiView(JWTAUTHENTICATION,generics.GenericAPIView):
    
    serializer_class = PaymentOrderVerifySerializer
    
    
    def post(self,reqeust) -> Response:
        
        
        serailizer  = self.get_serializer_class()
        
        serailizer  = serailizer(data=reqeust.data)
        
        
        if serailizer.is_valid(raise_expection=True):
            
            check = RazorPay.verfiy_payment(

                order_id   = serailizer.validated_data['order_id'],
                payment_id = serailizer.validated_data['payment_id'],
                signature  = serailizer.validated_data['signature']
    
            )
            
            if check is None:

                return Response(check.data,status.HTTP_200_OK)
    
            return Response({"error":"wrong  payment_id or order id or verfication id "},status=status.HTTP_400_BAD_REQUEST)
            
        return   Response(serailizer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    