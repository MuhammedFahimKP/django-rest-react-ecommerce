from django.conf import settings
from cryptography.fernet import Fernet,InvalidToken
from base64 import urlsafe_b64decode,urlsafe_b64encode
from binascii import Error









class Crypto:
    
    __key = settings.CRYPTO_KEY
    
    
    def __init__(self):
        self.key = self.__key 
        self.fernet = Fernet(self.key)
        
        
    
    
    def encrypt(self, message):
        if isinstance(message, str):
            message = message.encode()
        return self.fernet.encrypt(message)    
        
        
    
    def decrypt(self, encrypted_message):
        
        
        try :
            
            data =  self.fernet.decrypt(encrypted_message).decode()
            
            return data
        
        
        except (ValueError,InvalidToken) :
            
            return None
        
    
    
    def url_safe_encrypt(self,message):
        
        if isinstance(message,str):
            
            encrypted_message = urlsafe_b64encode(self.encrypt(message)).decode('utf-8')
            
            
            return encrypted_message
                
    
    
    def url_safe_decrypt(self,message):
        
        try : 
            
            encrypted_message = urlsafe_b64decode(message.encode('utf-8'))
            
            return self.decrypt(encrypted_message)
        
        except (Error,ValueError) :

            return None
                
        
    
            