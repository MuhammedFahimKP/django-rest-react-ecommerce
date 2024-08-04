from rest_framework.routers import DefaultRouter

from .viewsets import (
    AdminCategoeryViewset,
    AdminBrandViewset,
    AdminColorViewset,
    AdminSizeViewset,
    AdminProductViewSet,
    AdminProductVariantViewSet,
    AdminOrderAPIViewSet,
)


router = DefaultRouter()



router.register(
    'categoery',
    AdminCategoeryViewset,
    basename= 'categoery'

)

router.register(
    'brand',
    AdminBrandViewset,
    basename='brand'
)

router.register(
    'color',
    AdminColorViewset,
    basename='color'
)

router.register(
    'size',
    AdminSizeViewset,
    basename='size'
)
router.register(
    'product',
    AdminProductViewSet,
    basename='product'
)



router.register(

    'product-variant',
    AdminProductVariantViewSet,
    basename="product-variant"

)





router.register(
    'orders',
    AdminOrderAPIViewSet,
    basename='orders',

)











