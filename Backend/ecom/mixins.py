
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTPermission():
     
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    





