from django.utils.text import slugify

from shop.models import Categoery,Product,Brand,ProductVariant,ProductVariantImages,Size,Color
from shop.utils import get_or_create,get_or_none
from accounts.exceptions import AlreadyExist







from shop.serializers import( 
    CategoerySerializer,
    BrandSerializer,
    ColorSerializer,
    SizeSerializer,
    ProductSerilizer,
    ProductVariantImageSerializer,  
    ProductVariantSerailizer,
)

from accounts.exceptions import AlreadyExist
from rest_framework import serializers



class AdminSizeVariaitonSerailizer(serializers.ModelSerializer):
    
    size = serializers.SerializerMethodField()
    
    def get_size(self,obj):
        return obj.size.name
    
    
    class Meta:
        model = ProductVariant
        fields =  [
            'id',
            'size',
            'price',
            'stock',
        ]
    

class AdminSizeVariationCreateSerailizer(serializers.ModelSerializer):
    
    img   = serializers.PrimaryKeyRelatedField(queryset=ProductVariantImages.objects.all(),many=False)
    size  = serializers.PrimaryKeyRelatedField(queryset=Size.objects.all(),many=False)
    
    def validate(self,data):
        
        product_varaint_img = data['img']
        size                = data['size']
        product_varation    = ProductVariant.objects.filter(img=product_varaint_img,size=size)
        prduct_id           = product_varaint_img.img_id.split()[0]
        product             = Product.objects.get(id=prduct_id)
        color_id            = product_varaint_img.img_id.split()[1]
        color               = Color.objects.get(id=color_id)
        data['color']       = color
        data['product']     = product
        variant_id          = str(product.id) + " " + str(color.name) + " " + str(size.name)
        data['variant_id']  = slugify(variant_id)
        data['is_active']   = True
        
        
        if data['stock'] < 100:
            raise serializers.ValidationError({
                'stock' : 'stock must be 100 or more'
            })
        
        if  data['price'] < 1000 or data['price'] > 10000:
            
            raise serializers.ValidationError({
                'price' : 'price range must be 1000 to 10000'
            })
            
        
        if product_varation.exists() :
            raise AlreadyExist({
                'size' : 'already exist for the same color'
            })
            
        return data     
    
    def create(self,validated_data):
        
        for key,value in validated_data.items():
            
            print(f'{key}   {value}')
        
        instance = ProductVariant.objects.create(**validated_data)
        return instance   
            
    
    
    class Meta :
        model = ProductVariant
        fields = [
            'img',
            'price',
            'size',
            'stock',
        ]


class AdminSizeVariationUpdateSerailizer(serializers.ModelSerializer):
    
    
    price  = serializers.DecimalField(max_digits=16, decimal_places=2)
    stock  = serializers.IntegerField()
    size   = serializers.SerializerMethodField()
    
    def get_size(self,obj):
        return obj.size.name
    
    
    def validate(self, data):
        
        if not data['price'] and not data['stock']:  
            raise serializers.ValidationError({
                'not fields' : f'please provide any size or price '
            })
        
        
    def upate(self,instance,validated_data):
        
        instance.price   = validated_data.get('price',instance.price)
        instance.stock   = validated_data.get('stock',instance.stock)
        instance.save()
        
        return instance 
    
    class Meta:
        
        fields = [
            
            'price',
            'size',
            'stock',
        
        ]
    

class AdminProductVarationSerializer(serializers.ModelSerializer):    
    
    color = serializers.SerializerMethodField()
    
    
    def get_color(self,obj):
        
        color_id = obj.img_id.split()[1]
        color    = Color.objects.get(id=color_id)
        
        return f"{color.name}"

    
    class Meta:
        
        model  = ProductVariantImages
        fields = ['id','img_id','color','img_1','img_2','img_3']
        read_only_fields = ("img_1","img_2","img_3")
    
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
       
       
class AdminProductCreateSerailizer(serializers.ModelSerializer):
    
    
    categoery = serializers.PrimaryKeyRelatedField(queryset=Categoery.objects.all(),many=False)
    brand     = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(),many=False)
    img       = serializers.ImageField()
    
    
    
    def validate(self,data):
        
        name = data['name']
        product = Product.objects.filter(name__icontains=name)
        
        
        
        if product.exists():
            raise AlreadyExist({'name':"product with same name already exists"})
        
        data['slug'] = slugify(name)
        
        return data
    
    
    def create(self, validated_data):
        instance = Product.objects.create(**validated_data)
        
        return instance
    
    
    
    class Meta:
        
        model = Product
        fields = [
            'name',
            'categoery',
            'brand',
            'img',
            'is_active'
        ]
        
        
class AdminProductUpdateSerailizer(serializers.ModelSerializer):
    
    name      = serializers.CharField(required=False)
    categoery = serializers.PrimaryKeyRelatedField(queryset=Categoery.objects.all(),many=False,required=False)
    brand     = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(),many=False,required=False)
    img       = serializers.ImageField()
    
    
    def validate(self,data):
        
        if 'name' in data.keys():
            
            name = data['name']
            product = Product.objects.filter(name__icontains=name)
        
            if product.exists():
                raise AlreadyExist({'name':"product with same name already exists"})
        
            data['slug'] = slugify(name)
        return data
    
    
    def update(self,instance,validated_data):

        instance.name        = validated_data.get('name',instance.name)
        instance.categoery   = validated_data.get('categoery',instance.categoery)
        instance.brand       = validated_data.get('brand',instance.brand)
        instance.img         = validated_data.get('img',instance.img)
        instance.is_active   = validated_data.get('is_active',instance.is_active)
        instance.discription = validated_data.get('discription',instance.discription)
        instance.save()
        
        return instance
    
    
    
    class Meta:
        
        model = Product
        fields = [
            'name',
            'categoery',
            'brand',
            'img',
            'is_active',
            'discription',
        ]  
        
           
class AdminColorSerializer(ColorSerializer):

    is_active = serializers.BooleanField(required=False)
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model          = ColorSerializer.Meta.model
        current_fields = ColorSerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields         = current_fields + ['is_active','created','updated']


class AdminSizeSerializer(SizeSerializer):

    is_active  = serializers.BooleanField(required=False)
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    class Meta:
        model          = SizeSerializer.Meta.model
        current_fields = SizeSerializer.Meta.fields.copy()
        current_fields.insert(0,'id')
        fields         = current_fields + ['is_active','created','updated']
        



class AdminProductViewSerailizer(serializers.ModelSerializer):
    
    name      = serializers.SerializerMethodField()
    categoery = serializers.SerializerMethodField()
    brand     = serializers.SerializerMethodField()
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    
    
    
    def get_name(self,obj) -> str:
        return obj.name
    
    def get_categoery(self,obj) -> str:
        return obj.categoery.name
    
    def get_brand(self,obj) -> str:
        return obj.brand.name
    
    class Meta:
        model = Product
        fields = [
            
            'id',
            'name',
            'discription',
            'categoery',
            'brand',
            'img',
            'created',
            'updated',
            'is_active'
        ]
    
    
    
    
    
# class AdminProductSerializer(ProductSerilizer):
    
#     is_active = serializers.BooleanField(required=False)
#     created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
#     updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

#     brand     = AdminBrandSerializer()
#     categoery = AdminCategoerySerializer()

#     def validate(self,data):
#         print(data) 

#         try:

#             categoery  = Categoery.objects.get(name=data['categoery']['name'])
            
#             data['categoery'] = categoery


#         except:

#             raise serializers.ValidationError(

#                 'theres is no categoery in our db',
                
#             )

        
#         try:
#             brand       = Brand.objects.get(name= data['brand']['name'])
#             data['brand'] = brand
#         except:
#             raise serializers.ValidationError('there is no brand exist in our db')



#         return data



    

#     class Meta:

#         model          = ProductSerilizer.Meta.model
#         current_fields = ProductSerilizer.Meta.fields.copy()
#         current_fields.insert(0,'id')
#         fields         = current_fields + ['discription','is_active','created','updated'] 


   
    


#     def create(self,validated_data):

#         active  = validated_data.get('is_active',None)
#         discription = validated_data.get('discription',None)
#         img         = validated_data['img']


#         instance = Product(
#             name      = validated_data['name'],
#             img       = img if img else None,
#             categoery = validated_data['categoery'],
#             brand     = validated_data['brand'],
#             discription = discription,
#             is_active = active if active else False 
#         )
        
#         instance.save()
       
#         return instance
    

class AdminProductVariantSerializer(serializers.Serializer):



    
    stock        = serializers.IntegerField()
    img_1        = serializers.ImageField(required=True,)
    img_2        = serializers.ImageField(required=True)
    img_3        = serializers.ImageField(required=True)
    product      = serializers.CharField() 
    size         = serializers.CharField()
    color        = serializers.CharField()
    price        = serializers.IntegerField()
    

    class Meta:

       
        current_fileds = ProductVariantSerailizer.Meta.fields.copy()
        current_fileds.remove('img')
        fields         = current_fileds  + ['img_1','img_2','img_3','stock','is_active',]


    def validate(self, data):
      
        product = data.get('product',None)

        product = get_or_none(class_model=Product,name=product)
        if product is not None:
            data['product'] = product

        else:
            raise serializers.ValidationError(
                {'product':'we could find the product in our db'}
            )    
        

       


        

        return data
    
    def create(self,validate_data):
        color   = validate_data.get('color',None)
        img_1   = validate_data.get('img_1',None)
        img_2   = validate_data.get('img_2',None)
        img_3   = validate_data.get('img_3',None)
        size    = validate_data.get('size',None)
        active  = validate_data.get('is_active',False)

    



        if size is not None :
            size = get_or_create(class_model=Size,name=size)
            validate_data['size'] = size

        if color is not None:
            color = get_or_create(class_model=Color,name=color,slug=slugify(color))
            validate_data['color'] = color

        variant_id = str(validate_data['product'].id) + " " + str(validate_data['color'].name) + " " + str(validate_data['size'].name)
        print(variant_id)


        variant = ProductVariant.objects.filter(variant_id=slugify(variant_id)) 

        if variant.exists():

            raise serializers.ValidationError(
                {"product_variant":"product variant already exists"}
            )  
            
         


        img_id = str(validate_data['product'].id)+ " " + str(validate_data['color'].id)

        imges = get_or_none(class_model=ProductVariantImages,img_id=img_id)

        if imges is None:            

            imges = ProductVariantImages.objects.create(
                    img_id = img_id,
                    img_1  = img_1,
                    img_2  = img_2,
                    img_3  = img_3
            )

            
        validate_data.pop('img_1')
        validate_data.pop('img_2')
        validate_data.pop('img_3')
        

        print(validate_data)


            

            
        slug     = slugify(variant_id) 
        instance = ProductVariant.objects.create(
            variant_id = slug,
            img        =  imges,
            product    = validate_data['product'],
            stock      = validate_data['stock'],
            price      = validate_data['price'],
            size       = validate_data['size'],
            color      = validate_data['color'],
            is_active  = active
        )    

        return instance

                
class AdminProductVarintListSerializer(serializers.Serializer):

    
    img        = ProductVariantImageSerializer()
    product    = AdminProductViewSerailizer()
    stock      = serializers.IntegerField()
    size       = AdminSizeSerializer()
    color      = AdminColorSerializer()
    created    = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated    = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)


    class Meta:

        model          = ProductVariantSerailizer.Meta.model
        current_fileds = ProductVariantSerailizer.Meta.fields.copy()
        
        fields         = current_fileds  + ['created','updated','stock','is_active','product']
















