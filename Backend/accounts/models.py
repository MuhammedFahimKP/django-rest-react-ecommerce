from django.db import models

# Create your models here.

import uuid
from django.db import models
from django.contrib.auth.models import  AbstractBaseUser,PermissionsMixin
from .managers import MyUserManger
from rest_framework_simplejwt.tokens import RefreshToken






# from rest_framework_simplejwt.tokens import RefreshToken



AUTH_PROVIDERS = {
    'email':'email',
    'google':'google'
}






class MyUser(AbstractBaseUser,PermissionsMixin):

    id             = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email          = models.EmailField(unique=True,db_index=True)
    first_name     = models.CharField(max_length=150)
    last_name      = models.CharField(max_length=150,null=True)


 
    """
    required fields 

    """

    date_joined    = models.DateTimeField(auto_now_add=True)
    last_login     = models.DateTimeField(auto_now=True)

    "sub admin field"
    
    is_staff       = models.BooleanField(default=False)
    
    "super admin field"
    
    is_superuser   = models.BooleanField(default=False)

    "active field "
    
    is_active      = models.BooleanField(default=False)


    """

    authentication Type field  which is used to confirm 
    which type of authentication user done .

    commonly use email for normal user and
    google for user who authenticated through google



    """
    
    auth_provider = models.CharField(max_length=6,default=AUTH_PROVIDERS.get('email'))


    objects = MyUserManger() 

    """
       we are teling that model required fields and 
       usernamefield      
    """ 

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']
    
    

    def __str__(self) -> str:
        return f"{self.first_name}"

 
    @property
    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
    

    @property
    def tokens(self) -> dict[str, str]:
        
        """Allow us to get a user's token by calling user.token."""


        refresh = RefreshToken.for_user(self)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}



