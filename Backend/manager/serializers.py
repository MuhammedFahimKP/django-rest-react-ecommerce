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
     
    is_active = serializers.BooleanField() 
    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)

    


    class Meta:
        model          = CategoerySerializer.Meta.model 
        current_fields = CategoerySerializer.Meta.fields.copy()
        current_fields.insert(0,'id') 
        fields        = current_fields + ['is_active','created','updated']
    


class AdminBrandSerializer(BrandSerializer):

    is_active = serializers.BooleanField()
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
    
    is_active = serializers.BooleanField()
    #only read fields
    categoery = AdminCategoerySerializer(read_only=True)
    brand     = AdminBrandSerializer(read_only=True)
    
    #only write fields 
    Brand     = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all(),write_only=True)
    Categoery = serializers.PrimaryKeyRelatedField(queryset=Categoery.objects.all(),write_only=True)

    created   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)
    updated   = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S",read_only=True)




    class Meta:

        model          = ProductSerilizer.Meta.model
        current_fields = ProductSerilizer.Meta.fields.copy()
        current_fields.insert(0,'id')
        fields         = current_fields + ['Categoery','Brand','discription','is_active','created','updated'] 

    def create(self,validated_data):
        active  = validated_data.get('is_active',None)
        discription = validated_data.get('discription',None)
        instance = Product.objects.create(
            name      = validated_data['name'],
            img       = validated_data['img'],
            categoery = validated_data['Categoery'],
            brand     = validated_data['Brand'],
            discription = discription,
            is_active = active if active else False 
        )

        return instance