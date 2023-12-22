from django.db import models
import uuid



class BaseModel(models.Model):

    id       = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created  = models.DateTimeField(auto_now_add=True)
    updated  = models.DateTimeField(auto_now=True)



    class Meta:
        abstract = True
        



