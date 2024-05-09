from django.urls import path
from . import views 

urlpatterns = [

    #listing all Products
    
    path('product-latest/',views.LatestArrivalsListView.as_view(),name='product-latest'),
    
    path('product/',views.ListProductAPIView.as_view(),name="list-product"),
   
    #single Product 
    path('product-single/<str:slug>/',views.ProductRetriveApiView.as_view(),name="single-product-retrive"),
    

    # cartitems getting and creating view
    path('cart/',views.CartItemsListCreateApiView.as_view(),name="cart-items-create-and-update-view"),
    
    # single cart item getting and updating and delete view
    path('cart/<str:pk>/',views.CartItemReteriveUpdateDestroyAPIView.as_view(),name="cart-item-retrive-update-delete"),  

    # wishlistitems getting and creating view
    path('whishlist/',views.WishListItemsListCreateApiView.as_view(),name="wish-items-create-and-update-view"),

    # single wishlist item getting and updating and delete view
    path('whishlist/<str:pk>/',views.WishListItemReteriveUpdateDestroyAPIView.as_view(),name="wish-item-retrive-update-delete"),


]



