import razorpay
from django.conf import settings


razorpay_client:object = razorpay.Client(auth=(settings.RAZOR_PAY_KEY,settings.RAZOR_PAY_SECRETE_KEY))

