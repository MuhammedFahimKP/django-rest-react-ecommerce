from rest_framework import serializers
from .models import Order,OrderItems,Address,ProductVariant
from shop.serializers import ProductVariantSerailizer 
from .payments import make_razorpay_payment
from .utils import RazorPay



class OrderCreateSerializer(serializers.Serializer):
    
    
    product               = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all(),many=True)
    quantity              = serializers.DictField(child=serializers.IntegerField())
    shipping_address      = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    payment_type          = serializers.ChoiceField(choices=Order.payment_choices)
    
    
    
    
    
    
    
    
    

    
    
    
    
        
    
    
    
    class Meta:
        
        fields = [
            'product',
            'quantity',
            'shipping_address',
            'payment_type',
            'payment_transation_id'
            
        ]
    
    
    
    
        
        
        
                
        
        
    
            
            

        
            

        
        

class OrderItemSerializer(serializers.ModelSerializer):
    
    id = serializers.ModelField(
        model_field=OrderItems()._meta.get_field('id')
    )
    product = ProductVariantSerailizer()

    class Meta:
      
      model  = OrderItems
      fields = '__all__'

            
            
            
            
class OrderListSearializer(serializers.ModelSerializer):
    
    
    orders  = OrderItemSerializer(many=True)
    
    
    class Meta:
        model  = Order
        fields = [
            
            'user',           
            'address',        
            'total_amount',   
            'status' ,        
            'payment' ,      
            'payment_status',
            'orders'
        
        ]
    
    class Meta:
        
        model  = Order
        fields = '__all__'                            
                
        
                
            
            

        

        
            



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
    
    payment_order_id   = serializers.CharField(queryset=Order.objects.all())
    order_id           = serializers.PrimaryKeyRelatedField() 
    payment_id         = serializers.CharField()
    signature          = serializers.CharField()
    
    class Meta:
        
        fields = [
            'payment_order_id',
            'order_id',
            'payment_id',
            'signature',
        ]
             
        