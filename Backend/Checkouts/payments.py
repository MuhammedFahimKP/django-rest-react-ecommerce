from django.conf import settings


import razorpay



def make_razorpay_payment(amount:float,name:str) -> dict:
    
    
    
    
        
    client : object       =   razorpay.Client(auth=(settings.RAZOR_PAY_KEY,settings.RAZOR_PAY_SECRETE_KEY))  
    
    payment_data : dict   = {
        
        "amount": float(amount), 
        "currency": "INR", 
        "payment_capture": "1"
    } 
    payment =   client.order.create(payment_data)
    
        
    return payment
    
    
    
