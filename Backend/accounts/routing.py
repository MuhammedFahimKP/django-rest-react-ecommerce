from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/random-string/", consumers.NotificationConsumer.as_asgi()),
]