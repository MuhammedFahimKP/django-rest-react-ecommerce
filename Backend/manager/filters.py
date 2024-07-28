




import django_filters

from  shop.models import Product



class AdminProductFilterSet(django_filters.FilterSet):
    
    
    name     = django_filters.CharFilter(field_name="name",lookup_expr="icontains")

    brand    = django_filters.CharFilter(method='filter_brand')
    category = django_filters.CharFilter(method='filter_categories')
    
    
    
    def filter_brand(self, queryset, name, value):
        brands = value.split(',')
        print(brands)
        return queryset.filter(brand__name__in=brands)
    
    def filter_categories(self, queryset, name, value):
        categories = value.split(',')
        return queryset.filter(categoery__name__in=categories)
  
        
    
    
    
    class Meta:
       
       model  = Product
       fields = [
           
           'name',
           'brand',
           'category',
           
           
       ]

        