from decimal import Decimal
import razorpay
from django.conf import settings


razorpay_client : object = razorpay.Client(auth=(settings.RAZOR_PAY_KEY,settings.RAZOR_PAY_SECRETE_KEY))

class RazorPay:
    
    
    @staticmethod
    def create_payment_order(amount:Decimal,currency:str) -> dict:
        
        data = {
            
            'amount':float(amount),
            'currency':currency
        }
        
        payment_order = razorpay_client.order.create(data=data)
        return payment_order
    
    @staticmethod
    def verfiy_payment(order_id:str,payment_id:str,signature:str) -> dict:
        
        data = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        
        check = razorpay_client.utility.verify_payment_signature(data)
        
        return check 