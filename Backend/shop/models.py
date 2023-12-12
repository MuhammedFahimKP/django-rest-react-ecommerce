from typing import Any
from django.db import models
from django.utils.safestring import mark_safe
from BaseModels.models import BaseModel






# Create your models here.


class Categoery(BaseModel):

    name      = models.CharField(max_length=50,unique=True)
    img       = models.ImageField(upload_to="cat/",null=True,blank=True)
    is_active = models.BooleanField(default=False)


    def __str__(self) -> str:
        return f"{self.name}"
    
    @property
    def img_tag(self):
        return mark_safe('<img  style="width:100px;  height:100px;" src="%s" />' % self.img.url )
    

    class Meta:
        ordering = ('-created',)
        verbose_name_plural = "Categoeries"
        verbose_name = "Categoery"
    

   


class Brand(BaseModel):

    name      = models.CharField(max_length=200,unique=True)
    img       = models.ImageField(upload_to="brand/",null=True,blank=True)
    is_active = models.BooleanField(default=False)

class Color(BaseModel):

    name = models.CharField(max_length=200,unique=True)

class Size(BaseModel):
    
    name = models.CharField(max_length=200,unique=True)








class Product(BaseModel):

    name      = models.CharField(max_length=200,unique=True)
    category  = models.ForeignKey(Categoery,on_delete=models.CASCADE)
    brand     = models.ForeignKey(Brand,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False) 


class ProductVariant(BaseModel):

    product   = models.ForeignKey(Product,on_delete=models.CASCADE)
    color     = models.ForeignKey(Color,on_delete=models.CASCADE)
    size      = models.ManyToManyField(Size)
    img_1     = models.ImageField(upload_to="prdv1/",unique=True)
    img_2     = models.ImageField(upload_to="prdv2/",null=True,blank=True)
    img_3     = models.ImageField(upload_to="prdv3/" ,null=True,blank=True)
    price     = models.DecimalField(default=0.0,decimal_places=2,max_digits=15)
    stock     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=False)