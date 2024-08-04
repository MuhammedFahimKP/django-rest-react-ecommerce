from rest_framework import serializers
from rest_framework.request import Request

from accounts.serializers import UserViewSerailizer
from accounts.exceptions import AlreadyExist
from .utils import get_or_none,get_or_create


from .models import (
    Categoery,
    Brand,
    Size,
    Color,
    Product,
    ProductVariantImages,
    ProductVariant,
    Cart,
    CartItem,
    WishList,
    WishListItem,

)


from accounts.models import MyUser







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
        
        if Brand.objects.filter(name=validated_data['name']).exists():
            raise serializers.ValidationError('Brand already exist')
        
        instance = Brand.objects.create(name=validated_data['name'])
        return instance
 

    class Meta:
        model  = Brand
        fields = [
            'name',
        ]         

class ColorSerializer(serializers.ModelSerializer):

    name = serializers.CharField(max_length=15,min_length=2)


    class Meta:

        model  = Color
        fields = [
            'name',
            
        ]



class SizeSerializer(serializers.ModelSerializer):

   
    class Meta:

        model  = Size
        fields = [
            'name',
        ]

class ProductVariantImageSerializer(serializers.ModelSerializer):



    class Meta:
        model  = ProductVariantImages
        fields = [
        
            'img_1',
            'img_2',
            'img_3',
        ]    
            

class ProductVariantSerailizer(serializers.ModelSerializer):
   
    name    = serializers.SerializerMethodField()
    img     = ProductVariantImageSerializer()
    size    = serializers.SerializerMethodField()
    color   = serializers.SerializerMethodField()
    
    
    
    def get_size(self,obj):
        return f"{obj.size}"
    
    def get_color(self,obj):
        return f"{obj.color}"
    
    def get_name(self,obj):
        return f"{obj.product}"
    
    class Meta:
        model  = ProductVariant
        
        fields = [
            'name',
            'img',
            'size',
            'color',
            'price',
            'stock'
            
            
        ]


class ProductSerilizer(serializers.ModelSerializer):

    name      = serializers.CharField(max_length=50,min_length=5)
    categoery = serializers.SerializerMethodField()
    brand     = serializers.SerializerMethodField()
    colors    = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()
    
    
    def get_colors(self,obj):
        variants = obj.variants.all()
        
        colors = set()
        
        for variant in variants:
            
            colors.add(variant.color.name)
            
        return colors
    
    
    def get_min_price(self,obj):
        
        variants = obj.variants.all()
        
        min_price = variants[0].price
        
        for variant  in variants :
            
            if variant.price < min_price:
                
                min_price =variant.price
            
        return min_price
            
    
    
    
    
   
         
    
    
    def get_categoery(self,obj):
        return f"{obj.categoery.name}"
    
    
    
    

    def get_brand(self,obj):
        return f"{obj.brand.name}"
    

   
    class Meta:

        model  = Product
        fields = [
            'id',
            'name',
            'categoery',
            'brand',
            'img',
            'colors',
            'min_price',
            'discription',
            'slug',
            
            
        ]

 

class CartItemListSerailizer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()
    brand = serializers.SerializerMethodField()
    # categoery = serializers.SerializerMethodField()
    img  = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()

    quantity = serializers.IntegerField(required=True)

    url = serializers.HyperlinkedIdentityField(
        view_name="cart-item-retrive-update-delete",
        lookup_field = 'pk',
        read_only = True
    )

    subtotal = serializers.SerializerMethodField()
    
    def get_name(self,obj):
        return obj.product.product.name
    
    def get_color(self,obj):
        return obj.product.color.name
    
    def get_size(self,obj):
        return obj.product.size.name
    
    
    def get_brand(self,obj) :
        return obj.product.product.brand.name
    

    
    def get_price(self,obj):
        return int(obj.product.price)
    
    def get_img(self,obj):
        img_url =  obj.product.product.img.url 
        return "http://127.0.0.1:8000" + img_url
    
    
    
    def get_stock(self,obj):
        return obj.product.stock
    
    def get_subtotal(self,obj):
        return obj.product.price * obj.quantity
    
    class Meta:
        
        fields = ['id','name','quantity','stock','subtotal','size','color','url' ,'img','price','brand']
        model  = CartItem
        read_only_fields = ['img']
    
    
    
        
class CartListSerializer(serializers.ModelSerializer):
    
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)        
        self.fields['cart_items'].context.update(self.context)
    
    cart_items = CartItemListSerailizer(many=True,read_only=True)
    
    total      = serializers.SerializerMethodField()
    
    
    def get_total(self,obj:Cart) -> int :
        
        total_price = 0 
        
        for item in obj.cart_items.all():
           total_price += item.product.price * item.quantity
           
        return total_price   
            
    
    class Meta:
        
        fields = ['total','cart_items']
        model  = Cart
    



class CartCreateUpdateItemSerializer(serializers.ModelSerializer):

    product  = serializers.PrimaryKeyRelatedField(many=False,queryset=ProductVariant.objects.all())
    quantity = serializers.IntegerField(required=True)
    url = serializers.HyperlinkedIdentityField(
        view_name="cart-item-retrive-update-delete",
        lookup_field = 'pk',
        read_only = True
    )
    
    subtotal = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()
    
    def get_stock(self,obj) -> int :
        return obj.product.stock
    
    
    def get_subtotal(self,obj):
        return obj.product.price * obj.quantity
   



    class Meta:

        model  = CartItem
        fields = [
            'id',
            'product',
            'quantity',
            'url',
            'subtotal',
            'stock',


        ]

    def validate(self,data):

        request = self.context['request']
        user    = request.user
        
        if request.method  not in ['PUT ','PATCH']:
            
            product = data.get('product')
            cart    = get_or_create(class_model=Cart,user=user)
            
             
            if product is None:
                raise serializers.ValidationError(

                    'tht in our db '
                )

        

            data['cart'] = cart   
            
        


        return data


         


    def create(self,validated_data):

        instance = CartItem.objects.filter(cart=validated_data['cart'],product=validated_data['product'])

        if  instance.exists():
            
            instance = instance[0]
            
            quantity = validated_data['quantity']
            
            
            
            
            if  quantity:
                
                if  quantity  == 0:

                    raise serializers.ValidationError (
                        'quantity must be 1 or more'
                    )

                instance.quantity = instance.quantity + quantity 
                instance.save()

            return instance 

                        

        instance = CartItem.objects.create(

                    cart        = validated_data['cart'],
                    product     = validated_data['product'],
                    quantity    = validated_data['quantity'],
        )


        return instance
    
    def update(self, instance, validated_data):

        quantity = validated_data.get('quantity')
       
        
        # Check if quantity is zero, and delete the cart item if true
        if quantity and quantity == 0:
            
            instance.delete()

        else:
            
            instance.quantity = quantity

            instance.save()

        return instance 



    
class LatestArrivalsSerailizer(serializers.ModelSerializer):
    
    brand     = serializers.SerializerMethodField()
    colors    = serializers.SerializerMethodField('get_all_colors')
    min_price = serializers.SerializerMethodField()
    
    def get_brand(self,obj):
        return obj.brand.name
    
    
    def get_all_colors(self,obj):
        
        data = obj.variants.all().values_list('color__name', flat=True).distinct()
        
        return data
        #ProductVariant.objects.filter(product=product_instance).
        
    def get_min_price(self,obj):
        
        price = obj.variants.order_by('price').first() 
        
        return price.price    
        
    
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'img',
            'min_price',
            'brand',
            'colors',
            
        ]

# class WhishListItemProductSerailizer(serializers.ModelSerializer):
    
#     class Meta :
        
#         model = Product
        
#         fields = [
#             'id',
#             'name',
#             'slug',
#             'img',
#             'brand',
#             'categoery',
#             'discription',
#         ]
    
        
class WishListItemCreateSerializer(serializers.ModelSerializer):

    product  = serializers.PrimaryKeyRelatedField(many=False,queryset=ProductVariant.objects.all())


    class Meta:

        model  = WishListItem
        fields = [
            'product',
        ]

    def validate(self,data):

        request      = self.context['request']
        user         = request.user

        
        product      = data['product']
        wishlist     = get_or_create(class_model=WishList,user=user)
        data['wishlist'] = wishlist
        whish_items  =  WishListItem.objects.filter(wishlist=wishlist,product=product)
        
        if  whish_items.exists():           
            raise AlreadyExist({'product':'product already  exist in whishlist'})
        
        return data
    
    
    def create(self, validated_data):
        instance = WishListItem.objects.create(**validated_data)
        return instance
    

    
    

                    

class ProductSerilizerForVariantListing(serializers.ModelSerializer) :
    
    categoery = serializers.SerializerMethodField()
    brand     = serializers.SerializerMethodField()
    
    
    def get_categoery(self,obj):
        return f"{obj.categoery.name}"
    


    def get_brand(self,obj):
        return f"{obj.brand.name}"
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'categoery',
            'brand',
            'discription',
            'slug',
        ]
            
    
class ProductVariationListSerailizer(serializers.ModelSerializer):
      
    product  = ProductSerilizerForVariantListing(many=False,read_only=True)
    
    img      = ProductVariantImageSerializer()
    
    color    = serializers.SerializerMethodField()
    size     = serializers.SerializerMethodField()
    
    
    def get_color(self,obj):
        return obj.color.name
    
    def get_size(self,obj) :
        return obj.size.name
    
    
    
    class Meta:
        model = ProductVariant
        fields = [
            'id',
            'img',
            'product',
            'color',
            'size',
            'stock',
            'price',
        ]
        
        
class SingleProductVariantSerailer(serializers.ModelSerializer):
    
    color    = serializers.SerializerMethodField()
    size     = serializers.SerializerMethodField()
    
    img      = ProductVariantImageSerializer()
    
    
    def get_color(self,obj):
        return obj.color.name
    
    def get_size(self,obj) :
        return obj.size.name
    
    class Meta :
        
        model = ProductVariant
        exclude = ['product']
    
    
            
        
class SingleProductSerializer(serializers.ModelSerializer):
    
    colors   = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()
    
    brand     = serializers.SerializerMethodField()
    categoery = serializers.SerializerMethodField()
    
    
    def get_categoery(self,obj):
        return obj.categoery.name
    
    def get_brand(self,obj):
        return obj.brand.name
    
    

    def get_colors(self,obj):
        
        colors = ProductVariant.objects.filter(product=obj.id).values_list('color__name' ,flat=True).distinct()
        
        return colors

    
    def get_variants(self,obj):
        
    
        request:Request = self.context.get('request')
        
        color   = request.query_params.get('color')
        
        variants = []
        
        if color:
           color =  Color.objects.filter(name__icontains=color)
           color = color.first()
           
           variants = ProductVariant.objects.filter(color=color,product=obj.id)
           
           
        else:    
            firstproduct = ProductVariant.objects.filter(product=obj.id)
            
            if firstproduct.exists():
                firstproduct = firstproduct.first()
                variants     = ProductVariant.objects.filter(color=firstproduct.color,product=obj.id)
           
           
            
        data = SingleProductVariantSerailer(variants,many=True,context=self.context).data     
        
        return data
        
        
        
    
    
    
    
    
    class Meta :
        model   = Product     
        fields  = '__all__'       
     
     
class WishListParentProductSerializer(serializers.ModelSerializer):        


    
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
    

class WishListProductSerializer(serializers.ModelSerializer) :
    
    
    product = WishListParentProductSerializer(read_only=True,many=False)
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


class WishListItemsListSerailizer(serializers.ModelSerializer):
    
    product  = WishListProductSerializer(many=False)
    
    class Meta:
        model = WishListItem
        
        fields = [
            'id',
            'product'
        ]          
        