from rest_framework import serializers


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
        active  = validated_data.get('is_active',None)

        instance = Categoery.objects.create(
            name      = name,
            img       = img,
            is_active = active if active else False
        )

        return instance
        


   

class BrandSerializer(serializers.ModelSerializer[Brand]):
    
    name      =  serializerfields.LowercaseCharField(max_length=50,min_length=2,queryset=Brand.objects.all())
   

    class Meta:
        model  = Brand
        fields = [
            'name',
        ]         

class ColorSerializer(serializers.ModelSerializer):

    name = serializerfields.LowercaseCharField(max_length=15,min_length=2,queryset=Color.objects.all())


    class Meta:

        model  = Color
        fields = [
            'name',
            
        ]

class SizeSerializer(serializers.ModelSerializer):

    name = serializerfields.LowercaseCharField(max_length=14,min_length=1,queryset=Size.objects.all())

    class Meta:

        model  = Size
        fields = [
            'name',
        ]



class ProductSerilizer(serializers.ModelSerializer):

    name      = serializerfields.LowercaseCharField(max_length=50,min_length=5,queryset=Product.objects.all())
    categoery = CategoerySerializer(read_only=True)
    brand     = BrandSerializer(read_only=True)

   
    class Meta:

        model  = Product
        fields = [
            'name',
            'categoery',
            'brand',
            'img',
            'discription',
        ]

    

