from rest_framework import serializers
from accounts.serializers import UserViewSerailizer

from .models import (
    Categoery,
    Brand,
    Size,
    Color,
    Product,
    Cart,
    CartItem,
)


from accounts.models import MyUser
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

 

class CartSerializer(serializers.ModelSerializer[Cart]):

    user  = UserViewSerailizer(read_only=True)


    def validate(self,data):

        request = self.context['request']  
                
        if Cart.objects.filter(user=request.user).exists():
            raise serializers.ValidationError('you already had a cart u can took the cart from this end point using get method')

        return data 
                   



    def create(self,attrs):

        request = self.context['request']    
        instance = Cart.objects.create(user=request.user)  
            
        return instance
    


    class Meta:
        model  = Cart
        fields = [
            'user',
            'created',
            'updated',
        ]



    

