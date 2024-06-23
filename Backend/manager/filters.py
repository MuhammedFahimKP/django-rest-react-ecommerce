

import django_filters


from  shop.models import Product



class AdminProductFilterSet(django_filters.FilterSet):
    
    
    name     = django_filters.CharFilter(field_name="name",lookup_expr="icontains")
    brand    = django_filters.CharFilter(field_name="brand__name",lookup_expr="icontains")
    category = django_filters.CharFilter(field_name="categoery__name",lookup_expr="icontains")
  
        
    
    
    
    class Meta:
       
       model  = Product
       fields = [
           
           'name',
           'brand',
           'category',
           
           
       ]

        