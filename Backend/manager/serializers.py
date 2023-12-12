
from shop.serializers import CategoerySerializer
from rest_framework import serializers

class AdminCategoerySerializer(CategoerySerializer):
     
    is_active = serializers.BooleanField(default=False) 

    


    class Meta:
        model          = CategoerySerializer.Meta.model 
        current_fields = CategoerySerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields        = current_fields + ['is_active']


       




