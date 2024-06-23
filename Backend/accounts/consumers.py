import asyncio
import random
import string
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        await self.accept()
        await self.send_random_string()
        
        

    async def disconnect(self, close_code):
        pass

    async def send_random_string(self):
        
        while True:

            await self.send(text_data=json.dumps({
                "groups":str(self.groups),
                'layer':str(self.channel_layer),
                'channel':str(self.channel_name),
            }))
            
            await asyncio.sleep(1)
           

