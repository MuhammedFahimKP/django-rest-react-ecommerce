
from typing import Any
from django.db import models
from django.utils.safestring import mark_safe
from BaseModels.models import BaseModel
from accounts.models import MyUser






# Create your models here.


class Categoery(BaseModel):

    name      = models.CharField(max_length=50,unique=True)
    img       = models.ImageField(upload_to="cat/",null=True,blank=True)
    slug      = models.SlugField(max_length=200,unique=True,null=True)
    is_active = models.BooleanField(default=False)


    def __str__(self) -> str:
        return f"{self.name}"
    
    @property
    def img_tag(self):
        
        if self.img:
            return mark_safe('<img  style="width:100px;  height:100px;" src="%s" />' % self.img.url )
        else:
            return None
    

    class Meta:
        ordering = ('-created',)
        verbose_name_plural = "Categoeries"
        verbose_name = "Categoery"
    

   


class Brand(BaseModel):

    name      = models.CharField(max_length=200,unique=True)

    slug      = models.SlugField(max_length=200,unique=True,null=True)
    
    is_active = models.BooleanField(default=False)


    def __str__(self) ->str:
        return f"{self.name}"

class Color(BaseModel):

    name      = models.CharField(max_length=200,unique=True)
    slug      = models.SlugField(max_length=200,unique=True,null=True)
    is_active = models.BooleanField(default=False)
    
    def __str__(self) -> str:
        return f"{self.name}"
    
    
class Size(BaseModel):
    
    name      = models.CharField(max_length=200,unique=True)
    is_active = models.BooleanField(default=False)


    def __str__(self) -> str:
        return f"{self.name}"




 



class Product(BaseModel):

    name        = models.CharField(max_length=200,unique=True)
    slug        = models.SlugField(max_length=200,unique=True,null=True)
    categoery   = models.ForeignKey(Categoery,on_delete=models.CASCADE)
    img         = models.ImageField(upload_to='product/',blank=True,null=True)
    brand       = models.ForeignKey(Brand,on_delete=models.CASCADE)
    discription = models.TextField(max_length=500,null=True)
    is_active   = models.BooleanField(default=False) 
    



    def __str__(self) -> str:
        return f"{self.name}"
    

    

    @property
    def img_tag(self):
        if self.img:
            return mark_safe('<img  style="width:100px;  height:100px;" src="%s" />' % self.img.url )
        else:
            return None


class ProductVariantImages(BaseModel):
    slug      = models.SlugField(max_length=200,unique=True,null=True)
    img_1     = models.ImageField(upload_to="prdv1/",null=True,blank=True)
    img_2     = models.ImageField(upload_to="prdv2/",null=True,blank=True)
    img_3     = models.ImageField(upload_to="prdv3/" ,null=True,blank=True)




class ProductVariant(BaseModel):
    name      = models.CharField(max_length=200,unique=True,null=True)
    slug      = models.SlugField(max_length=200,unique=True,null=True)
    product   = models.ForeignKey(Product,on_delete=models.CASCADE)
    img       = models.ForeignKey(ProductVariantImages,on_delete=models.CASCADE,default=None)
    color     = models.OneToOneField(Color,on_delete=models.CASCADE,null=True)
    size      = models.ForeignKey(Size,null=True,on_delete=models.CASCADE)
    price     = models.DecimalField(default=0.0,decimal_places=2,max_digits=15)
    stock     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.product} {self.size} {self.color}'


    
    
class Cart(BaseModel):

    user      = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)


    def __str__(self)-> str:
        return f"{self.user}'s cart"

    

class CartItem(BaseModel):

    cart      = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product   = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity  = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    def __str__(self)-> str:
        return f"{self.product} and {self.cart.user}"
    
    class Meta:

        ordering = ('-created',)



class WishList(BaseModel):

    user       = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    is_active  = models.BooleanField(default=True)



class WishListItem(BaseModel):

    wishlist = models.ForeignKey(WishList,on_delete=models.CASCADE)
    product   = models.ForeignKey(Product,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)


    class Meta:

        ordering = ('-created',)







    



