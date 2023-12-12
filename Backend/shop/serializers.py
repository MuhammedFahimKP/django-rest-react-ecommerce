from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import (
    Categoery,
    Brand,
    Size,
    Color,
    Product,
    ProductVariant,
)

from . import serializerfields 



class CategoerySerializer(serializers.ModelSerializer[Categoery]):

    name      = serializerfields.LowercaseCharField(max_length=50,min_length=5,queryset=Categoery.objects.all()) 
    img       = serializers.ImageField(required=True)
    

    


    class Meta:
        model   = Categoery 
        fields  = [
            'name',
            'img',     
        ]

   
    

    def create(self,validated_data):
        name    = validated_data.get('name',None) 
        img     = validated_data.get('img',None)

        instance = Categoery.objects.create(
            name      = name,
            img       = img,
            is_active = True,
        )

        return instance
        


   

class BrandSerializer(serializers.ModelSerializer[Brand]):
    
    name      =  serializerfields.LowercaseCharField(max_length=50,min_length=5,queryset=Categoery.objects.all())
    img       =  serializers.ImageField(required=True)
    

    class Meta:
        model  = Brand
        fields = [
            'name',
            'img' ,
        ]         