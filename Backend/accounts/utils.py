from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.conf import settings 
from django.contrib.auth import get_user_model

from rest_framework.exceptions import AuthenticationFailed,NotFound,NotAuthenticated

from datetime import datetime, timedelta

from google.auth.transport import requests
from google.oauth2 import id_token
from google.auth.transport import requests 


from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad


from .models import MyUser

import jwt

import os

import base64


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



def login_user(email,password):
       user = MyUser.objects.filter(email=email)
       if user.exists():
              user = user[0]
              
              if user.check_password(password) == False:
                     raise AuthenticationFailed({'password':'inccrrect password'})
              
              if user.is_active == False:
                     raise NotAuthenticated({'email':'not verified user'})
                             
              return get_user_details_and_tokens(user=user)
       
       raise  NotFound({'email':'user with email not found'})
              
              
       
       
       
       
       



# def login_user(email):
#         social_user = authenticate(email=email,password=settings.SOCIAL_AUTH_PASSWORD)
#         return get_user_details_and_tokens(social_user)
       

          

def register_social_user(email,first_name,last_name):
                
       user = MyUser.objects.filter(email=email)
       if user.exists():
              if  user[0].auth_provider == 'google':                               
                     return login_user(email,password=settings.SOCIAL_AUTH_PASSWORD)           
              else:
                     raise AuthenticationFailed ({'email' :f'please login with your {user[0].auth_provider} account'})
              
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
              return login_user(email=email,password=settings.SOCIAL_AUTH_PASSWORD)
                

import hashlib

def convert_to_16_byte_code(input_string):
    # Convert the string to bytes using UTF-8 encoding
    input_bytes = input_string.encode('utf-8')
    
    # Compute the SHA-256 hash of the input bytes
    hash_object = hashlib.sha256(input_bytes)
    
    # Get the digest (hash value) as bytes
    hash_bytes = hash_object.digest()
    
    # Trim the hash to the first 16 bytes (128 bits)
    trimmed_hash = hash_bytes[:16]
    
    # Convert the bytes to a hexadecimal string
    hex_code = trimmed_hash.hex()
    
    return hex_code


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
                       
                        

def user_exists_or_not(**kwargs) -> bool:
       
       """
       return true if user is exists with same **kwargs attribute matchs 
       otherwise it return a  false
       """
       
       USER = get_user_model()
       
       
       user = USER.objects.filter(**kwargs) 
       
       if user.exists():
              return True 
       

       return False


def get_user_details_and_tokens(user:MyUser):
       return {
              'access':user.tokens.get('access'),
              'refresh':user.tokens.get('refresh'),
              'user':{
                     'email':user.email,
                     'first_name':user.first_name,
                     'last_name':user.last_name,
                     'role':user.role
              }
       }



       

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from base64 import b64decode

import secrets


def decrypt_string(encrypted_string):
       
    key = settings.DECRYPT_KEY
    
    
    
    encrypted_string = base64.decode(encrypted_string)
    cipher = AES.new(key.encode('utf-8'),AES.MODE_ECB)
    return unpad(cipher.decrypt(encrypted_string),16)
    
                                            



    
    
              
  
                        
