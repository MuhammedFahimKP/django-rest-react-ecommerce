from __future__ import absolute_import,unicode_literals

from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string



from ecom.celery import app

from utils.crypto import Crypto

from .utils import create_activation_link


@app.task
def send_activation_email(user_id,to):
    
    
    
    frontend__link = create_activation_link(user_id)

    # Render the email template
    subject = "Activate Your Account"
    template_name = "activation.html"
    context = {
        "frontend_link": frontend__link,
    }
    body = render_to_string(template_name, context)



   
    send_mail(subject='Account Activation',message='',html_message=body,from_email=settings.EMAIL_HOST_USER,recipient_list=[to])
    
    return 'Done'
   

