from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _



class MyUserManger(BaseUserManager):

    def email_validator(self,email):

        try:
            validate_email(email)

        except ValidationError:
            raise ValueError(_("Please enter a valid email address"))    
        
    def create_user(self,email,first_name,last_name,password,**other_fields):

        if email:
            email = self.normalize_email(email)
            self.email_validator(email) 
        else:
            raise ValueError(_("You Must provide an Email Address"))    
     
        
        if not first_name:
            raise ValueError(_("You Must provide a First Name")) 

        user  = self.model(email=email,first_name=first_name,last_name=last_name,**other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,email,first_name,last_name,password,**other_fields):
        
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'super user must assigned to is_staff=True')
        
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser Must be assigned to is_superuser=True')
        
        return self.create_user(email,first_name,last_name,password,**other_fields)
    