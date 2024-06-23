
from rest_framework.exceptions import NotAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import Token

from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer




from .models import MyUser




class JWTUserAuthentication(JWTAuthentication):
    
    def get_user(self, validated_token: Token) -> MyUser:
        
        user = super().get_user(validated_token)
        
        if not user.is_logedin:
            
            raise NotAuthenticated({'user':'loged out please login again'})            
                    
        return user
    
class JWTAdminUserAuthentication(JWTUserAuthentication):
    
    
    def get_user(self, validated_token: Token) -> MyUser:
        
        user = super().get_user(validated_token) 
        
        if  user.is_staff  and user.is_authenticated :
            
            return user
        
        raise NotAuthenticated({'user':'unautherized'})
    

