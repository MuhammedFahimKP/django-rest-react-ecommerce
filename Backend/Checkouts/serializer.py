from rest_framework import serializers
from .models import Order,OrderItems,Address,ProductVariant



class OrderCreateSerializer(serializers.ModelSerializer):
    
    
    products              = serializers.PrimaryKeyRelatedField(queryset=ProductVariant.objects.all(),many=True)
    quantity              = serializers.DictField(child=serializers.IntegerField())
    shipping_address      = serializers.PrimaryKeyRelatedField(queryset=Address.objects.all())
    payment_type          = serializers.ChoiceField(choices=Order.payment_choices)
    payment_transation_id = serializers.CharField(max_length=100,null=True)
    
    
    
    def validate(self, attrs):
        print(attrs)
        return attrs
        
    
    
    
    class Meta:
        
        models = OrderItems
        fields = [
            'products',
            'qauntity',
            'shipping_address',
            'payment_type',
            'payment_transation_id'
            
        ]
    
    
    
    def create(self, validated_data):
        
        
        
        
        return 