import django_filters

from django.db.models.query import EmptyQuerySet
from django.contrib.auth import get_user_model


from  shop.models import Product



class AdminProductFilterSet(django_filters.FilterSet):
    
    
    name     = django_filters.CharFilter(field_name="name",lookup_expr="icontains")

    brand    = django_filters.CharFilter(method='filter_brand')
    category = django_filters.CharFilter(method='filter_categories')
    
    
    
    def filter_brand(self, queryset, name, value):
        brands = value.split(',')

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


USER = get_user_model() 

       
class AdminUserFilterSet(django_filters.FilterSet):
    
    is_logged = django_filters.BooleanFilter(field_name='is_logged')
    is_active = django_filters.BooleanFilter(field_name='is_active')
    auth_type = django_filters.CharFilter(method='filter_by_auth_type')
    
    
    def filter_by_auth_type(self,queryset,name,value):
        
        if value in [ 'google' , 'email' ] :
            
            qs = queryset.filter(auth_provider=value)
            
            return qs
        
        qs = EmptyQuerySet() 
            
        return qs
            
            
            
    
    
    
     
    
    class Meta:
        
        model  = USER
        fields = [
            'is_logged',
            'is_active',
        ]          