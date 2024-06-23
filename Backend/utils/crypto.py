from django.conf import settings

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

from rest_framework.exceptions import JsonResponse

import base64

test_enc = 'TKVLY5quDyY6ZsfHRYT+yakoX8YcnXqFzUk6S2ElitE='
enc = base64.b64decode(test_enc)
derived_key = base64.b64decode("'Tt/YxrlwlygfcAx+vXK0ZLo/wVVRGm/Qmv2K5sARL1c='")


try:
     
    iv = "1020304050607080"
    cipher = AES.new(derived_key, AES.MODE_CBC, iv.encode('utf-8'))
    data  = unpad(cipher.decrypt(enc),16)
    print(data.decode('utf-8'))


except (ValueError,KeyError )  as e  :
    data  = 'Invalid Token'
    print(e)




class Crypto:
    
    __key = base64.b64decode(settings.CRYPTO_KEY)
    __iv  = settings.CRYPTO_IV
    
    
    def decrypt(cls,message):
        
       try :
           
           cipher = AES.new(cls.__key,AES.MODE_CBC,cls.__iv.encode('utf-8'))
           
           pass
       except  (ValueError,KeyError):
           
           raise     