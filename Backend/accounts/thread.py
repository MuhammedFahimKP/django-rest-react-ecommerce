from threading  import Thread
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from .utils import create_verification_token
from .models import MyUser


class EmailThread(Thread):

    def __init__(self,req,user):
        self.req   = req
        self.email = user['email']
        self.user  = MyUser.objects.get(email=self.email)
        Thread.__init__(self)


    def run(self):
            token = create_verification_token(self.user.id)
            current_site = get_current_site(self.req)
            mail_subject = 'Activate Your Account'
            message      = f'hello {self.user.get_full_name} please  activate  your account  http://{current_site}/api/user-activation/{token}/'
            to_email  = self.email
            sendemail = EmailMessage(mail_subject,message,to=[to_email]) 
            sendemail.send()    