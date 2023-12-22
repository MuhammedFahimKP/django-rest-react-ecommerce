from shop.models import Categoery,Product,Brand
from shop.serializers import( 
    CategoerySerializer,
    BrandSerializer,
    ColorSerializer,
    SizeSerializer,
    ProductSerilizer,
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