from django.utils.translation import gettext_lazy as  _
from rest_framework import exceptions,status


class AlreadyExist(exceptions.APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = _('Data Already Exists.')
    default_code = 'data already exists'
