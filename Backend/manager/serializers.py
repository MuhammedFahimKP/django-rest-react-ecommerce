from shop.models import Categoery,Product,Brand,ProductVariant,ProductVariantImages,Size,Color
from shop.utils import get_or_create,get_or_none
from django.utils.text import slugify

from shop.serializers import( 
    CategoerySerializer,
    BrandSerializer,
    ColorSerializer,
    SizeSerializer,
    ProductSerilizer,
    ProductVariantImageSerializer,  
    ProductVariantSerailizer,
)
from rest_framework import serializers

class AdminCategoerySerializer(CategoerySerializer):
     
    is_active = serializers.BooleanField(required=False) 
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    img       = serializers.ImageField(read_only=True)
    


    class Meta:
        model          = CategoerySerializer.Meta.model 
        current_fields = CategoerySerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields         = current_fields + ['is_active','created','updated']
    


class AdminBrandSerializer(BrandSerializer):

    is_active = serializers.BooleanField(required=False)
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model          = BrandSerializer.Meta.model 
        current_fields = BrandSerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields        = current_fields + ['is_active','created','updated']
       
class AdminColorSerializer(ColorSerializer):

    is_active = serializers.BooleanField()
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model          = ColorSerializer.Meta.model
        current_fields = ColorSerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields         = current_fields + ['is_active','created','updated']


class AdminSizeSerializer(SizeSerializer):

    is_active  = serializers.BooleanField()
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model          = SizeSerializer.Meta.model
        current_fields = SizeSerializer.Meta.fields.copy()
        current_fields.insert(0,'id')
        fields         = current_fields + ['is_active','created','updated']


class AdminProductSerializer(ProductSerilizer):
    
    is_active = serializers.BooleanField(required=False)
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    brand     = AdminBrandSerializer()
    categoery = AdminCategoerySerializer()

    def validate(self,data):
        print(data) 

        try:

            categoery  = Categoery.objects.get(name=data['categoery']['name'])
            
            data['categoery'] = categoery


        except:

            raise serializers.ValidationError(

                'theres is no categoery in our db',
                
            )

        
        try:
            brand       = Brand.objects.get(name= data['brand']['name'])
            data['brand'] = brand
        except:
            raise serializers.ValidationError('there is no brand exist in our db')



        return data



    

    class Meta:

        model          = ProductSerilizer.Meta.model
        current_fields = ProductSerilizer.Meta.fields.copy()
        current_fields.insert(0,'id')
        fields         = current_fields + ['discription','is_active','created','updated'] 


   
    


    def create(self,validated_data):

        active  = validated_data.get('is_active',None)
        discription = validated_data.get('discription',None)
        img         = validated_data['img']


        instance = Product(
            name      = validated_data['name'],
            img       = img if img else None,
            categoery = validated_data['categoery'],
            brand     = validated_data['brand'],
            discription = discription,
            is_active = active if active else False 
        )
        
        instance.save()
       
        return instance
    

class AdminProductVariantSerializer(ProductVariantSerailizer):



    variant_id   = serializers.CharField(read_only=True)
    stocks       = serializers.IntegerField()
    img          = ProductVariantImageSerializer()

    class Meta:

        model          = ProductVariantSerailizer.Meta.model
        current_fileds = ProductVariantSerailizer.Meta.fields.copy()
        current_fileds.insert(0,'id')
        current_fileds.insert(1,'variant_id')
        
        fields         = current_fileds  + ['stocks','is_active','img']


    def validate(self, data):
      
        product = data.get('product',None)
        if product is not None:
            
            product = Product.objects.get(name=product['name'])

            data['product'] = product

        else:
            raise serializers.ValidationError(
                {'product','we could find the product in our db'}
            )    
        

       


        

        return data
    
    def create(self,validate_data):
        color   = validate_data.get('color',None)
        img     = validate_data.get('img',None)
        name    = img.get('name',None)
        size    = validate_data.get('size',None)
        active  = validate_data.get('is_active',False)

    



        if size is not None :
            size = get_or_create(model=Size,name=validate_data['size']['name'])
            validate_data['size'] = size

        if color is not None:
            color = get_or_create(class_model=Color,name=validate_data['color']['name'])
            validate_data['color'] = color

        variant_id = str(validate_data['product'].id) + " " + str(validate_data['color'].name) + " " + str(validate_data['size'].name)

        if ProductVariant.objects.filter(variant_id=variant_id).exists():

            raise serializers.ValidationError(
                {"product_variant":"product variant already exists"}
            )  
            
        if img is not None:  
            

            img_id = str(validate_data['product'].id)+ " " + str(validate_data['colour'].id)

            imges = get_or_none(class_model=ProductVariantImages,img_id=img_id)

            if imges is None:            

                imges = ProductVariantImages.objects.create(
                    name   = str(validate_data['color'].name + validate_data['product'].name),
                    img_1  = img['img_1'],
                    img_2  = img['img_2'],
                    img_3  = img['img_3']
                )  

            validate_data['img'] = imges 



            
        slug     = slugify(variant_id) 
        instance = ProductVariant.objects.create(
            variant_id     = slug,
            img       = validate_data['img'],
            product   = validate_data['product'],
            stocks    = validate_data['stocks'],
            price     = validate_data['price'],
            size      = validate_data['size'],
            color     = validate_data['color'],
            is_active = active
        )    

        return instance

                








