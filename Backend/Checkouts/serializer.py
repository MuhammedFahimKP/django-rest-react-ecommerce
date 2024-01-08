from rest_framework import serializers
from .models import Order,OrderItems,Address,ProductVariant
from shop.serializers import ProductVariantSerailizer 
from .payments import make_razorpay_payment




class OrderCreateSerializer(serializers.Serializer):
    
    
    product               = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all(),many=True)
    quantity              = serializers.DictField(child=serializers.IntegerField())
    shipping_address      = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    payment_type          = serializers.ChoiceField(choices=Order.payment_choices)
    payment_transation_id = serializers.CharField(max_length=100,required=False)
    
    
    def validate(self, data):
        transation_id = data.get('payment_transation_id',None)
        
        
        if data['payment_type'] == 'UPI' and transation_id is None:            
            raise serializers.ValidationError(
                {'payment_transation_id':'please provide transation id'}
            )
        
        return data
    
    
    

    
    
    
    
    
        
    
    
    
    class Meta:
        
        fields = [
            'product',
            'quantity',
            'shipping_address',
            'payment_type',
            'payment_transation_id'
            
        ]
    
    
    
    def create(self, validated_data):
        
        try:
            request       = self.context.get('request',None)
            
            transation_id = validated_data.get('payment_transation_id',None)
            payment_status  = 'Paid' if transation_id is not None else 'Pending'
            order = Order.objects.create(
                user                  = request.user,
                address               = validated_data['shipping_address'],
                total_amount          = 0.0,
                status                = 'Placed',
                payment               = validated_data['payment_type'],
                payment_transation_id = transation_id,
                payment_status        = payment_status,             
            )
            
        
            products : list[object]     = validated_data.get('product',None)
            quantity : dict[str,int]    = validated_data.get('quantity',None) 
            total_amount : float = 0.0
            
            for prd in products:
                
            
                
                
                
                item_quantity = quantity.get(prd.id,1)
                
                orderitem = OrderItems.objects.create(
                    order   = order,
                    product = prd,
                    quantity = item_quantity
                
                )                
                total_amount += float(prd.price) * item_quantity
                
            payment    =  make_razorpay_payment(amount=total_amount,name=request.user.first_name)    
            print(payment)
            order.total_amount = total_amount 
            order.save()
            
            return order
        
        
                
        
        
        except ValueError as e:
            
            raise serializers.ValidationError(
                {"Value error":f"Invalid input, use an integer : {str(e)}"}
            )
            
            

        
            

        
        

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
                
        
                
            
            

        

        
            
        
            
        