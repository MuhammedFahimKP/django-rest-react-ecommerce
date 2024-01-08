from .import razorpay_client as client

class RazorPay:
    
    
    @staticmethod
    def create_payment_order(amount:float,currency:str) -> dict:
        
        data = {
            
            'amount':amount,
            'currency':currency
        }
        
        payment_order = client.oder.create(data=data)
        return payment_order
    
    @staticmethod
    def verfiy_payment(order_id:str,payment_id:str,signature:str) -> dict:
        
        data = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        
        check = client.utility.verify_payment_signature(data)
        
        return check 
        
        
        
    
    
    
        
        
        
        
        
    
    
    


