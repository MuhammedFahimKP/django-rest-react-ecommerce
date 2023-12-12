from rest_framework.routers import DefaultRouter
from .viewsets import AdminCategoeryViewset


router = DefaultRouter()
router.register(
    'categoery',
    AdminCategoeryViewset,
    basename= 'categoery'

)

urlpatterns = router.urls










