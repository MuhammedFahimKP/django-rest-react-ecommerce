from typing import Any


class BaseMiddleWare:
    
    
    
    def __init__(self,get_response):
        self.get_response = get_response
        
        
        
    def __call__(self,request):
        
        print('Satrt ',self.middleware_name)
        response = self.get_response(request)
        print('End' ,self.middleware_name)
        

class middle1(BaseMiddleWare):
    middleware_name ='1'
           
           
class middle2(BaseMiddleWare):
    middleware_name  = '2'
    
              