from django.utils.translation import gettext_lazy as _

from rest_framework.exceptions import APIException
from rest_framework import status



class TimeOUTException(APIException):
    status_code = status.HTTP_410_GONE
    default_detail = _('Timeout') 
    default_code = 'timeout'
    
    
    
    