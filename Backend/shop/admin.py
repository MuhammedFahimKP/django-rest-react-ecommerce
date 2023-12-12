from django.contrib import admin
from .models import Categoery
# Register your models here.
# admin.site.register(Categoery)


@admin.register(Categoery)
class CategoeryAdmin(admin.ModelAdmin):

    list_display = ('name','img_tag')
