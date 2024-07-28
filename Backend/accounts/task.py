from __future__ import absolute_import,unicode_literals

from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task

from ecom import celery_app




@celery_app.task()
def send_mails(self, message,recipent,subject):
    recipient_list = [recipent]
    mail_subject = subject
    send_mail(
        subject = mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=recipient_list,
        fail_silently=False,
        )
    return "Done"


@celery_app.task()
def print_numbers():
        
    send_mail(
            subject='gahs',
             message='halo suhail',
             from_email=settings.EMAIL_HOST_USER,
             recipient_list=[
                 'fahimmuhammmedfahimkp@gmail.com'
             ],
            fail_silently=False
    )

@celery_app.task()    
def sendrandom():  
    
    send_mail(
            subject='dfkdjfjk',
             message='hal dhshjfjhsd',
             from_email=settings.EMAIL_HOST_USER,
             recipient_list=[
                 'fahimmuhammmedfahimkp@gmail.com'
             ],
            fail_silently=False
    )  

        
