from rest_framework import serializers
from .models import Order,OrderItems,Address,ProductVariant
from shop.serializers import ProductVariantSerailizer 







class OrderCreateSerializer(serializers.Serializer):
    
    
    
    
    
    """
    
    -> this serializer is only for to collect the data from client and create order in view
    
    
    """
    
    
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
                
        
                
            
            

        

        
            




        
        
class PaymentOrderVerifySerializer(serializers.Serializer):   
    
    
    """
    
    -> this serailiazer is used to verify the razor pay order in the view 
    
    """
    
    payment_order_id   = serializers.CharField()
    order_id           = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all()) 
    payment_id         = serializers.CharField()
    signature          = serializers.CharField()
    
    class Meta:
        
        fields = [
            'payment_order_id',
            'order_id',
            'payment_id',
            'signature',
        ]
             
        