from google.auth.transport import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_auth_requests
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password
from .models import MyUser
from datetime import datetime, timedelta
import jwt

"""
   google python client libary for google auth 

"""


class Google:
     
     @staticmethod 
     def validate(access_token):
          
        try:     
               
              id_info = id_token.verify_oauth2_token(access_token,requests.Request(),settings.GOOGLE_CLIENT_ID)
              if 'accounts.google.com' in id_info['iss']:
                     return id_info
               



        except Exception as e:
               return "Token is Invalid or has expired"    



def login_user(email):
        social_user = authenticate(email=email,password=settings.SOCIAL_AUTH_PASSWORD)
        return {
            "email":social_user.email,
            "fullname":social_user.get_full_name,
            "access_token":f"{social_user.tokens['access']}",
            "refresh_token":f"{social_user.tokens['refresh']}"                            
       }
       

          

def register_social_user(email,first_name,last_name):
                
                user = MyUser.objects.filter(email=email)
                if user.exists():
                        if  user[0].auth_provider == 'google':                               
                               return login_user(email)           
                        else:
                             return f'please login with your {user[0].auth_provider} account '
                           
                else:
                        user_data = {
                                'email':email,
                                'first_name':first_name,
                                'last_name':last_name,
                                'password': make_password(settings.SOCIAL_AUTH_PASSWORD)
                                
                        }
                
                        register_user = MyUser.objects.create(**user_data)
                        register_user.auth_provider = 'google'
                        register_user.is_active = True
                        register_user.save() 
                        return login_user(email=email)
                



def create_verification_token(user_id):
       payload = {
              'user_id':str(user_id),
              'exp':datetime.utcnow() + timedelta(days=1)
       }
       return jwt.encode(payload,settings.SECRET_KEY, algorithm='HS256')


def verify_token(token):
        try:
              payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
              return payload['user_id']
        except jwt.ExpiredSignatureError:
              return None
        except jwt.InvalidTokenError:
               return None
                       
                        

                                            

                        
