from rest_framework import serializers



from accounts.serializers import ShippingAddressSerializer
from accounts.models import ShippingAddress

from shop.serializers import ProductVariantSerailizer , ProductVariantImageSerializer

from shop.models import ProductVariant,Product



from .models import Order,OrderItems










class OrderCreateSerializer(serializers.Serializer):
    
    
    
    
    
    """
    
    -> this serializer is only for to collect the data from client and create order in view
    
    
    """
    
    
  
   
    shipping_address      = serializers.PrimaryKeyRelatedField(queryset=ShippingAddress.objects.all(),many=False)
    payment_type          = serializers.ChoiceField(choices=Order.payment_choices)
   
    
    
    
    
    
    
    
    
    
    

    
    
    
    
        
    
    
    
    class Meta:
        
        
        
        fields = [
            
            
            'shipping_address',
            'payment_type',
            
    
            
        ]
    

class ProductSerailizer(serializers.ModelSerializer):
    
    categoery  = serializers.SerializerMethodField()
    brand      = serializers.SerializerMethodField()
    
    def get_categoery(self,obj):
        return obj.categoery.name
    
    
    def get_brand(self,obj):
        return obj.brand.name
    
    
    
    
    
    
    
    class Meta:
        
        model = Product
        
        fields = [  
            'id',
            'name'  ,  
            'slug' ,
            'categoery',    
            'img',         
            'brand',       
            'discription'
        ]  


class OrderItemProductSerailizer(serializers.ModelSerializer):
    
    product = ProductSerailizer()
    img     = ProductVariantImageSerializer(read_only=True,many=False)
    size    = serializers.SerializerMethodField()
    color   = serializers.SerializerMethodField()
    
    
    def get_size(self,obj):
        return obj.size.name
    
    
    
    
    def get_color(self,obj):
        return obj.color.name

    
    
    class Meta:
        
        fields = [
            'id',
            'product',
            'img',
            'size',
            'color',
            'price',
        ]
        model  = ProductVariant
        
        
    

    
    

class OrderItemSerializer(serializers.ModelSerializer):
    
    
    product = OrderItemProductSerailizer(read_only=True,many=False,context={})
    
    
    
    class Meta:
        model  = OrderItems
        fields = ['product','id','quantity']    
    
class OrderListSerializer(serializers.ModelSerializer):
    
    orders = OrderItemSerializer(read_only=True,many=True)
    expected_delivery = serializers.SerializerMethodField()
    
    
    def get_expected_delivery(self,obj):
        return obj.expected_delivery
    
    class Meta:
        model = Order
        exclude = ['user','address']    
        
        
        
        
                
        
        
    
            
            

        
            
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
    
        
        

# class OrderItemSerializer(serializers.ModelSerializer):
    
    
#     product = OrderProductSerailizer()

#     class Meta:
      
#       model  = OrderItems
#       fields = [
#           'id',
#           'product',
#           'quantity'
#       ]

            
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


class AllOrdersListSerializer(serializers.ModelSerializer):
    
    expected_delivery = serializers.SerializerMethodField()
    
    
    def get_expected_delivery(self,obj):
        return obj.expected_delivery
    
    class Meta:
        exclude = ['user' ,'address','updated']
        # fields = '__all__' 
        model = Order
        


            
# class OrderListSearializer(serializers.ModelSerializer):
    
    
#     orders       = OrderItemSerializer(many=True)
#     address      = AdrressOrderListSerializer()
#     payment_type = serializers.SerializerMethodField()
#     created      = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    
    
    
#     def get_payment_type(self,obj):
#         return obj.payment
    
    
    
    
    
#     class Meta:
#         model  = Order
#         fields = [
#             'id',
#             'orders',                  
#             'total_amount',  
#             'created', 
#             'status' ,        
#             'address',
#             'payment_type' ,      
#             'payment_status',
            
        
#         ]
    
   
        
                
            
            
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
    order_id           = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(),many=False) 
    payment_id         = serializers.CharField()
    signature          = serializers.CharField()
    
    class Meta:
        
        fields = [
            'payment_order_id',
            'order_id',
            'payment_id',
            'signature',
        ]
             
        