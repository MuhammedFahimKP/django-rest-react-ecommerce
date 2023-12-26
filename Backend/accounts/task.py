from __future__ import absolute_import,unicode_literals


from celery import shared_task
from django.core.mail import send_mail
from celery import shared_task

from django.conf import settings

@shared_task(bind=True)
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
