from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.templatetags.static import static

from shop.models import Categoery,Product,Brand,ProductVariant,ProductVariantImages,Size,Color
from shop.utils import get_or_create,get_or_none
from accounts.exceptions import AlreadyExist

from checkouts.models import Order


from checkouts.serializer import OrderItemSerializer
from accounts.serializers import ShippingAddressSerializer







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
    img       = serializers.ImageField()
    
    
    
    


    class Meta:
        model          = CategoerySerializer.Meta.model 
        current_fields = CategoerySerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields         = current_fields + ['is_active','created','updated']
    
    
    
    def create(self, validated_data):
        
        category = Categoery.objects.filter(name__exact=validated_data['name'])
        
        if category.exists() :
            
            raise AlreadyExist({'name':'category with same name already exist'})
        
        return super().create(validated_data)
    
    def update(self,instance,validated_data):
        if validated_data['name']:
            category =  Categoery.objects.filter(name__exact=validated_data['name']).exclude(id=instance.id)
            
            
        
            if category.exists() :
                raise AlreadyExist({'name':'category with same  name already exist'})
            
        
        return super().update(instance,validated_data)
    


class AdminBrandSerializer(BrandSerializer):

    is_active = serializers.BooleanField(required=False)
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    
    
    
    def create(self, validated_data):
        
        brands = Brand.objects.filter(name__exact=validated_data['name'])
        
        if brands.exists() :
            
            raise AlreadyExist({'name':'brand with same name already exist'})
        
        return super().create(validated_data)
    
    def update(self,instance,validated_data):
        
        if validated_data['name'] :
            
            brands =  Brand.objects.filter(name__exact=validated_data['name']).exclude(id=instance.id)
        
            if brands.exists() :
                raise AlreadyExist({'name':'brand with same name already exist'})
            
        return super().update(instance,validated_data)
        
    
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
            'discription',
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
    
    
    def create(self, validated_data):
        
        color = Color.objects.filter(name__exact=validated_data['name'])
        
        if color.exists() :
            
            raise AlreadyExist({'name':'color with same name already exist'})
        
        return super().create(validated_data)
    
    def update(self,instance,validated_data):
        if validated_data['name']:
            color =  Color.objects.filter(name__exact=validated_data['name']).exclude(id=instance.id)
            

        
            if color.exists() :
                raise AlreadyExist({'name':'color with same name already exist'})
            
        
        return super().update(instance,validated_data)
    
    
    
    
    
    

    class Meta:
        model          = ColorSerializer.Meta.model
        current_fields = ColorSerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields         = current_fields + ['is_active','created','updated']


class AdminSizeSerializer(serializers.ModelSerializer):

    
    
    
    def create(self, validated_data):
        
        size = Size.objects.filter(name__exact=validated_data['name'])
        
        if size.exists() :
            
            raise AlreadyExist({'size':'size with same name already exist'})
        
        return super().create(validated_data)
    
    def update(self,instance,validated_data):
        if validated_data['name']:
            size =  Size.objects.filter(name__exact=validated_data['name']).exclude(id=instance.id)
            
            
        
            if size.exists() :
                raise AlreadyExist({'size':'category with same name already exist'})
            
        
        return super().update(instance,validated_data)
    
    
    
    

    class Meta:
        model          = Size
        fields         = ['id','name','created','updated']
        



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
    
    
    
    


class AdminProductVariantSerializer(serializers.Serializer):



    
    stock        = serializers.IntegerField()
    img_1        = serializers.ImageField(required=True)
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











class AdminColorVariationSerializer(serializers.ModelSerializer):
    
    product = serializers.PrimaryKeyRelatedField(write_only=True,read_only=False,queryset=Product.objects.all(),many=False,required=False)
    color   = serializers.PrimaryKeyRelatedField(write_only=True,read_only=False ,queryset=Color.objects.all(),many=False,required=False)
    img_1   = serializers.ImageField()
    img_2   = serializers.ImageField()
    img_3   = serializers.ImageField()
     
    def validate(self, data):
        
        img_id  =  str(data['product'].id)+ " " + str(data['color'].id)        
        image   = ProductVariantImages.objects.filter(img_id=img_id)
        
        if image.exists():
            
            raise AlreadyExist({'color':'product alrady have same varaition '})
        
        
        
        
        data['img_id'] = img_id
        
        data.pop('product')
        
        data.pop('color')
        
        
        return data
    
    
    def create(self, validated_data):
        
        instance = ProductVariantImages.objects.create(**validated_data)
        
        return instance
    
    
    
    class Meta:
        
        fields = ['id','img_id', 'img_1','img_2','img_3','color','product',] 
        model  = ProductVariantImages
        


class AdminOrderListSerailizer(serializers.ModelSerializer):
    
    
    user              = serializers.SerializerMethodField()  
    expected_delivery = serializers.SerializerMethodField()
    
    
    def get_expected_delivery(self,obj):
        return obj.expected_delivery
    
    
    
    def get_user(self,obj):
        return obj.user.email
    
    class Meta:
        model = Order 
        exclude = ['address'] 
        
class AdminOrderRetriveSerializer(serializers.ModelSerializer):
    
    
    orders = OrderItemSerializer(read_only=True,many=True)
    expected_delivery = serializers.SerializerMethodField()
    address  = ShippingAddressSerializer(read_only=True,many=False)
    
    
    def get_expected_delivery(self,obj):
        return obj.expected_delivery

    
    
    
    class Meta:
        
        model = Order 
        exclude = ['updated']    


class AdminOrderUpdateSerializer(serializers.Serializer) :
    
    status = serializers.ChoiceField(choices=Order.status_choices)
    
    class Meta:
        
        fields = ['status']    
    
    
    
 
USER_MODEL =  get_user_model()   

class AdminUserSerializer(serializers.ModelSerializer):
    
    
    avatar = serializers.SerializerMethodField()
    
    role   = serializers.SerializerMethodField()
    
    auth_type = serializers.SerializerMethodField()
    
    
    
    
    
    def get_avatar(self,obj):
        
        request = self.context.get('request')
        
        base_url = request.build_absolute_uri('/') if request else ''
        if obj.auth_provider == 'google' and obj.google_img is not None :
            
            return obj.google_img.url
        
        if obj.auth_provider == 'email':
            
            
            try:
                
                if request is not None :
                
    
                    img_url = base_url + obj.avatar_img.url
            
            
                    return img_url
            except ValueError :
                
                pass
            
            
        
        

        return  base_url + 'static/images/avatar.png'
    
    
    def get_role(self,obj):
        
        if obj.is_superuser and obj.is_staff:
            return 'admin'
        
        if obj.is_staff:
            return 'subadmin'
        
        return 'user'
    
    def get_auth_type(self,obj) :
        return obj.auth_provider            
            
    
    class Meta:
        model  = USER_MODEL
        fields = ['email','first_name','last_name','date_joined','auth_type','is_active','last_login' , 'avatar' , 'role' ,'is_logedin']
        
         