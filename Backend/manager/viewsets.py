from ecom.mixins import JWTPermission
from rest_framework import viewsets
from .serializers import AdminCategoerySerializer
from shop.models import Categoery
from .permissions import AdminOnly

class AdminCategoeryViewset(JWTPermission,viewsets.ModelViewSet):
    
    permission_classes = [AdminOnly] 
    queryset           = Categoery.objects.all()
    serializer_class   = AdminCategoerySerializer
    lookup_field       ='pk'
    
    
