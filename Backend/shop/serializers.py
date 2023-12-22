from rest_framework import serializers
from accounts.serializers import UserViewSerailizer
from .utils import get_or_none,get_or_create

from .models import (
    Categoery,
    Brand,
    Size,
    Color,
    Product,
    Cart,
    CartItem,
    WishList,
    WishListItem,
)


from accounts.models import MyUser
from . import serializerfields 






class CategoerySerializer(serializers.ModelSerializer[Categoery]):

    name      = serializers.CharField(max_length=50,min_length=5,required=False) 
    img       = serializers.ImageField(required=False)
    


    class Meta:
        model   = Categoery 
        fields  = [
            'name',
            'img',     
        ]

   
    

    def create(self,validated_data):

        
        if Brand.objects.filter(name=validated_data['name']).exists():
            raise serializers.ValidationError('Brand already exist')
        
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
    
    name  =  serializers.CharField(required=False,max_length=50)


    def create(self, validated_data):
        
        if Brand.objects.filter(name=validated_data['name']).exists:
            raise serializers.ValidationError('Brand already exist')
        
        instance = Brand.objects.create(name=validated_data['name'])
        return instance
 

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

    name  =  serializers.CharField(max_length=50,min_length=5)
    
    brand     = BrandSerializer(read_only=True)
    categoery = CategoerySerializer(read_only=True)

   
    class Meta:

        model  = Product
        fields = [
            'name',
            'categoery',
            'brand',
            'img',
            'discription',
        ]

 





class CartItemSerializer(serializers.ModelSerializer):

    product  = ProductSerilizer()
    quantity = serializers.IntegerField(required=True)
    url = serializers.HyperlinkedIdentityField(
        view_name="cart-item-retrive-update-delete",
        lookup_field = 'pk',
        read_only = True
    )
   



    class Meta:

        model  = CartItem
        fields = [

            'product',
            'quantity',
            'url',


        ]

    def validate(self,data):

        request = self.context['request']
        user    = request.user

       
        

        
        product = get_or_none(class_model=Product,name=data['product']['name'])
        cart    = get_or_create(class_model=Cart,user=user)



        if product is None:
            raise serializers.ValidationError(

                'tht in our db '
            )


        data['product'] = product
        data['cart'] = cart   


        return data


         


    def create(self,validated_data):

        instance = CartItem.objects.filter(cart=validated_data['cart'],product=validated_data['product'])

        if  instance.exists():
            
            instance = instance[0]
            
            if  validated_data['quantity'] == 0:

                raise serializers.ValidationError (
                    'quantity must be 1 or more'
                )
            
            instance.save()

            return instance 



            
                        

        instance = CartItem.objects.create(

                    cart        = validated_data['cart'],
                    product     = validated_data['product'],
                    quantity    = validated_data['quantity'],
        )


        return instance
    
    def update(self, instance, validated_data):

        instance.quantity = validated_data.get('quantity', instance.quantity)
        
        # Check if quantity is zero, and delete the cart item if true
        if instance.quantity == 0:
            instance.delete()
        else:
            instance.save()

        return instance 

class WishtListItemSerializer(serializers.ModelSerializer):

    product  = ProductSerilizer()
    
   



    class Meta:

        model  = WishListItem
        fields = [
            'product',
        ]

    def validate(self,data):

        request = self.context['request']
        user    = request.user

        
        product  = get_or_none(class_model=Product,name=data['product']['name'])
        wishlist = get_or_create(class_model=WishList,user=user)




        if product is None:

            raise serializers.ValidationError(

                'there  no product in our db '
            )

        data['wishlist']  = wishlist
        data['product']   = product

        


        return data


         


    def create(self,validated_data):

        instance = WishListItem.objects.filter(wishlist=validated_data['whishlist'],product=validated_data['product'])

        if  instance.exists():
            
            instance = instance[0]
            
            if  validated_data['quantity'] == 0:

                raise serializers.ValidationError (
                    'quantity must be 1 or more'
                )
            
            
            instance.save()


            return instance 



            
                        

        instance = WishListItem.objects.create(

            wishlist    = validated_data['wishlist'],
            product     = validated_data['product'],
            quantity    = validated_data['quantity'],
        )


        return instance
    
    





    

