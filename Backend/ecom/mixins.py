
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTPermission():
     
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]





