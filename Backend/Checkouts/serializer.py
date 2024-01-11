from rest_framework import serializers
from .models import Order,OrderItems,Address,ProductVariant
from shop.serializers import ProductVariantSerailizer 
from accounts.serializers import ShippingAddressSerializer







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
    
    
    
    
        
        
        
                
        
        
    
            
            

        
            
class OrderProductSerailizer(ProductVariantSerailizer):
    
    product  = serializers.SerializerMethodField()
    
    def get_product(self,obj):
        return obj.product.name
        
    
    
    class Meta:
        
        model  = ProductVariantSerailizer.Meta.model
        fields = [
            
            'product',
            'img',
            'size',
            'color',
        ] 
    
        
        

class OrderItemSerializer(serializers.ModelSerializer):
    
    
    product = OrderProductSerailizer()

    class Meta:
      
      model  = OrderItems
      fields = [
          'id',
          'product',
          'quantity'
      ]

            
class AdrressOrderListSerializer(ShippingAddressSerializer):
    
    class Meta:
        
        model  = ShippingAddressSerializer.Meta.model 
        
        fields = [
    
            'state', 
            'place',
            'city',
            'pin_code',
            'landmark',
            'phone_no',
            'alter_phone_no',
        
        ]
            
            
class OrderListSearializer(serializers.ModelSerializer):
    
    
    orders       = OrderItemSerializer(many=True)
    address      = AdrressOrderListSerializer()
    payment_type = serializers.SerializerMethodField()
    created      = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    
    
    
    def get_payment_type(self,obj):
        return obj.payment
    
    
    
    
    
    class Meta:
        model  = Order
        fields = [
            'id',
            'orders',                  
            'total_amount',  
            'created', 
            'status' ,        
            'address',
            'payment_type' ,      
            'payment_status',
            
        
        ]
    
   
        
                
            
            
class OrderCancelSerializer(serializers.Serializer):
    
    order_id = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    
    
    def validate(self,data):
        
        request = self.context.get('request')
        user    = request.user 
        order   = data.get('order_id') 
        
        if order.user != user:
            return serializers.ValidationError({
                "user":"does'nt  have the permission",  
            })
        
        if order.status == 'Delivered':
            return serializers.ValidationError({
                "order":"already delivered",  
            })
            
            
        
        return data     
    
        
        
    
    class Meta:
        fields = ['order_id']
        
        

        
            




        
        
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
             
        