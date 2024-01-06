import django_filters
from  .models import Product


class ProductFilterSet(django_filters.FilterSet):
    
    
    product  = django_filters.CharFilter(field_name="variants__product__name",lookup_expr="icontains")
    brand    = django_filters.CharFilter(field_name="brand__name",lookup_expr="icontains")
    category = django_filters.CharFilter(field_name="categoery__name",lookup_expr="icontains")
    size     = django_filters.CharFilter(field_name="variants__size__name",lookup_expr="icontains")
    color    = django_filters.CharFilter(field_name="variants__color__name",lookup_expr="icontains")
    
    
    class Meta:
       
       model  = Product
       fields = [
           'product',
           'brand',
           'category',
           'size',
           'color'
       ] 
        
        
    
     

