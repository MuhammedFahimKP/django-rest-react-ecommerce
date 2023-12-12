from rest_framework.permissions import IsAdminUser


class AdminOnly(IsAdminUser):
    
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)