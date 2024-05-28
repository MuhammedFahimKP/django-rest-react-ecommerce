from django.urls import path 
from . import views
from .routers import router 

urlpatterns = [
    
    path('product-variations/<str:pk>/' , view=views.GetVarationsForProduct.as_view(),name='admin-product-variations'),
    path('varation/<str:pk>/',view=views.GetSingleProductVariatonImages.as_view(),name='get-admin-vartion'),
    path('varation/sizes/<str:pk>/',view=views.GetPerticualerSizesOfColor.as_view(),name="get-admin-sizes"),
    path('size-variation-create/',view=views.SizeVariationCreateAPIview.as_view(),name="create-admin-size"),
    path('color-variation/',view=views.ColorVarationCreateUpdateView.as_view(),name='color-variation'),
    

] + router.urls