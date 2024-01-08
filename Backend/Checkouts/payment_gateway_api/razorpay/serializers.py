from rest_framework import serializers
from .main import RazorPay


class PaymentOrderCreateSerializer(serializers.Serializer):
    
    currency = serializers.CharField(required=False)
    amount  = serializers.DecimalField(decimal_places=2,max_digits=15)
    
    
    class Meta:
        
        fields = [
            'amount',
            'currency'
        ]
    
    
    def validate_amount(self,value) -> float:
        
        if value < 0.0:
            
            raise serializers.ValidationError(
                {"amount":"amount mustbe greater than 0 "}
            ) 
        
        return value
    
    
    def create(self,validate_data):
        
        currency = validate_data.get('currency','INR')
        
        client_order =  RazorPay.create_payment_order(amount=validate_data['amount'],currency=currency)
        
        error  = client_order.get('error')
        
        
        if error is not None:
            
            
            raise serializers.ValidationError(
                {"error":error}    
            )
            
        return client_order
        
        
class PaymentOrderVerifySerializer(serializers.Serializer):   
    
    order_id   = serializers.CharField()
    payment_id = serializers.CharField()
    signature  = serializers.CharField()
    
    class Meta:
        
        fields = [
            'order_id',
            'payment_id',
            'signature'
        ]
             
             
              
         
         
