from django.conf import settings
import stripe


stripe.api_key = settings.STRIPE_SECRET_KEY


def payment_function(amount_to_paid):
    
    checkout_session = stripe.checkout.Session.create(
        
        line_items= [
            {
                'price': '{{PRICE_ID}}'
            }
        ]
        
        
    )
    
    
    
