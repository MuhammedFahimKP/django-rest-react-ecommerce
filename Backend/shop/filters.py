import django_filters
from  .models import Product,ProductVariant


class ProductFilterSet(django_filters.FilterSet):
    
    
    name     = django_filters.CharFilter(field_name="variants__product__name",lookup_expr="icontains")
    brand    = django_filters.CharFilter(field_name="brand__name",lookup_expr="icontains")
    category = django_filters.CharFilter(field_name="categoery__name",lookup_expr="icontains")
    size     = django_filters.CharFilter(field_name="variants__size__name",lookup_expr="iexact")
    color    = django_filters.CharFilter(field_name="variants__color__name",method='filter_product_having_color')
    
    
    def filter_product_having_color(self, queryset, name, value):
        return  queryset.filter(variants__color__name__icontains=value).distinct()

    class Meta:
       
       model  = Product
       fields = [
           
           'name',
           'brand',
           'category',
           'size',
           'color',
           
       ]


class ProductVariantFilterSet(django_filters.FilterSet):
    
    
    slug     = django_filters.CharFilter(field_name="product__slug",lookup_expr="iexact")
    brand    = django_filters.CharFilter(field_name="product__brand__name",lookup_expr="icontains")
    category = django_filters.CharFilter(field_name="product__categoery__name",lookup_expr="icontains")
    size     = django_filters.CharFilter(field_name="size__name",lookup_expr="iexact")
    color    = django_filters.CharFilter(field_name="color__name",method='filter_product_having_color')
    
    
    def filter_product_having_color(self, queryset, name, value):
        return  queryset.filter(color__name__icontains=value)

    class Meta:
       
       model  = ProductVariant
       fields = [
           
           'slug',
           'brand',
           'category',
           'size',
           'color',
           
       ]

    
     