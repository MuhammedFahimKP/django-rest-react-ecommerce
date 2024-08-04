from django.db.models.query import QuerySet
from django_filters import rest_framework as filters
from datetime import datetime, timedelta
from .models import Order
from utils.dates import generate_year_list_from_current_year

class OrderFilter(filters.FilterSet):
    
    
    
    DATE_RANGE_FILTER =  [
        ('last_year', 'Last Year'),
        ('last_six_months', 'Last Six Months'),
        ('last_three_months', 'Last Three Months'),
        ('last_month', 'Last Month'),
        ('last_two_weeks', 'Last Two Weeks'),
        ('this_week', 'This Week'),
    ]
    
    
    payment    =  filters.CharFilter(field_name="payment",lookup_expr="icontains")
    status     =  filters.CharFilter(field_name="status",lookup_expr='iexact')
    
    created    = filters.CharFilter(field_name='created',method='filter_by_created' , lookup_expr='iexact')
    
    
    def filter_by_created(self,queryset,name,value):
        
                
        years = generate_year_list_from_current_year() 
        
        print(years)
        
            
        
        if value in years or value == 'past_3_months':
            
            
            
            
            print(value)
            if value == 'past_3_months':
                
                three_months_ago = datetime.now() - timedelta(days=90)
            
                qs = queryset.filter(created__gte=three_months_ago)
                
                queryset = qs
                
            if  value in years:
                
                print(value)
                qs = queryset.filter(created__year=int(value))
                
                queryset = qs
               
                
                
            return queryset
        
               
                
            
        model = self.Meta.model
        queryset = model.objects.none()
            
    
        return queryset
        

    
    

    class Meta:
        model = Order
        fields = ['created','status' , 'payment']
        
        
        

    