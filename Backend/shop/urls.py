from django.urls import path
from . import views 


urlpatterns = [
    
    path('categoery-create/',views.CategoeryCreateApiView.as_view()),
]
