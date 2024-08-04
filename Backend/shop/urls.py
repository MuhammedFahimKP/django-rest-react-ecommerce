from django.urls import path
from . import views 

urlpatterns = [

    #listing all Products
    
    path('product-latest/',views.LatestArrivalsListView.as_view(),name='product-latest'),
    
    path('',views.ListProductAPIView.as_view(),name="list-product"),
    
    
    path('brand/',views.BrandListingAPIView.as_view(),name="brand-listing-user"),
    
    path('categoery/',views.CategoeryListingAPIView.as_view(),name='categoery-listing-user'),
    
    path('color/',views.ColoursListingAPIView.as_view(),name="colors-listing-user"),
    
    
    path('variations/',views.ProductVariantRetriveAPIView.as_view(),name="variations"),
    
    
    
   
    #single Product 
    path('product-single/<str:slug>/',views.ProductRetriveApiView.as_view(),name="single-product-retrive"),
    

    # cartitems getting and creating view
    path('cart/',views.CartItemsListCreateApiView.as_view(),name="cart-items-create-and-update-view"),
    
    # single cart item getting and updating and delete view
    path('cart/<str:pk>/',views.CartItemReteriveUpdateDestroyAPIView.as_view(),name="cart-item-retrive-update-delete"),  
    
    
    path('single/<str:slug>/',views.SingleProductRetrivalAPIView.as_view(),name='single-product-get'),
    
    path('size/',views.SizesListingAPIView.as_view(),name="sizes-listing-user"),

    # wishlistitems getting and creating view
    path('wishlist/',views.WishListItemsListCreateApiView.as_view(),name="wish-items-create-and-update-view"),

   
    path('wishlist/<str:pk>/',views.WishListItemReteriveDestroyAPIView.as_view(),name="wish-item-retrive-update-delete"),


]



