from django.db import models

# Create your models here.

import uuid
from django.db import models
from django.contrib.auth.models import  AbstractBaseUser,PermissionsMixin
from .managers import MyUserManger
from rest_framework_simplejwt.tokens import RefreshToken
from BaseModels.models import BaseModel





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
    def tokens(self) -> dict[str : str]:
        
        """Allow us to get a user's json web token by calling user.token."""


        refresh = RefreshToken.for_user(self)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}






class Profile(BaseModel):
    
    """
        profile model for user picture and stor another  user data if we need to store in future for this project
    """
    
    """
        user  
    """
    user   = models.OneToOneField(MyUser,null=True,on_delete=models.CASCADE)


    # avatar image field ? 

    avatar = models.ImageField(upload_to='profiles/avatars',null=True,blank=True)

    def __str__(self) -> str:
        return f"{self.user.email}'s profile"
    

class ShippingAddress(BaseModel):
    
    state_choices = [
        
      ("Kerala","Kerala"),
      ("Karnataka","Karnataka"),
      ("Tamilnadu","TamilNadu")
    ]
    
    
    user            = models.ForeignKey(MyUser,on_delete=models.CASCADE)
    pin_code        = models.CharField(max_length=6,verbose_name="pincode")
    city            = models.CharField(max_length=100)
    state           = models.CharField(choices=state_choices,max_length=50)
    place           = models.CharField(max_length=100)
    landmark        = models.CharField(max_length=100)
    phone_no        = models.CharField(max_length=10,verbose_name="phone no")
    alter_phone_no  = models.CharField(max_length=10,verbose_name="alternate phone no")
    is_active       = models.BooleanField(default=False)




    def __str__(self)->str:
        return f"near {self.landmark}, {self.place}, {self.state} {self.pin_code}"
    