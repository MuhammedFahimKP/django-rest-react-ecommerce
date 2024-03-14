from django.utils.translation import gettext_lazy as  _
from rest_framework import exceptions,status


class UserAlreadyExist(exceptions.APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = _('User Already Exists.')
    default_code = 'user already exists'
