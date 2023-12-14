from django.contrib import admin
from .models import (
    Categoery,
    Product,
    Brand,
    Size,
    Color,
    Cart,
)
# Register your models here.
# admin.site.register(Categoery)


@admin.register(Categoery)
class CategoeryAdmin(admin.ModelAdmin):

    list_display = ('name','img_tag')


admin.site.register(Brand)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(Cart)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = ('name','img_tag')