from django.conf import settings
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework.exceptions import AuthenticationFailed,NotFound

from .models import MyUser,ShippingAddress
from .utils import (
    Google,
    register_social_user,
    verify_token,
    user_exists_or_not,
    decrypt_string
)
from .thread import EmailThread
from .task import send_mail
from .exceptions import AlreadyExist





# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     def get_token(cls,user):
#         token = super().get_token()

#         token['email'] = user.email

#         return token



 




class UserRegisterSerialzer(serializers.ModelSerializer):

    password  = serializers.CharField(max_length=68,min_length=8,write_only=True)
    email     = serializers.EmailField(max_length=68,min_length=8)

    class Meta:
        model  = MyUser
        fields =  [
            'email',
            'first_name',
            'last_name',
            'password',
            
        ] 


    def validate(self,attrs):
        
        if user_exists_or_not(email=attrs['email']):
            raise AlreadyExist({'email' : 'User with same Email already exists '})
        
        password  = attrs.get('password','')
        password  = decrypt_string(password)
        attrs['password'] =  password
        
        return attrs   
    
    

    def create(self,validated_data):
        return super().create(validated_data)
    


         
class UserViewSerailizer(serializers.ModelSerializer):

    email      = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name  = serializers.CharField(read_only=True)
    role       = serializers.SerializerMethodField()
    
    
    
    def get_role(self,obj) -> str:
        return obj


    class Meta:
        model = MyUser
        fields = [
            
            'id',
            'email',
            'first_name',
            'last_name',
            'role'
        ]

    
    


class UserSignInSerializer(serializers.ModelSerializer):


    """
      taking email and password from the client 
    """




    email    = serializers.EmailField(max_length=255,write_only=True)
    password =  serializers.CharField(write_only=True)


    """
    
    sending  jwt(for the user),email,name of the user to the client 

    """


    access = serializers.CharField(max_length=255,read_only=True)
    refresh = serializers.CharField(max_length=255,read_only=True)
    user = UserViewSerailizer(read_only=True)




    class Meta:

        model = MyUser
        fields = [
            'email',
            'user',
            'password',
            'access',
            'refresh',
            
            
        ]

    def validate(self,attrs):

        """
            taking password and email from client
        """
        email     = attrs.get('email')
        password  = attrs.get('password')
        password  = decrypt_string(password) 

        
        
        
        """
            authenticate function while return a user object if creadentials are ok
            otherwise it return a None 
            
        """
        
        user = MyUser.objects.filter(email__iexact=email) 
        
        if user.exists() :
            
            user = user[0]
            
            if user.check_password(password):
                
                if not user.is_active:
                    raise AuthenticationFailed({'User':'Not activated'})
                
                token = user.tokens
                
                
                
                return {
                    
                    'user':{
                      'id':user.id,
                      'email':user.email,
                      'first_name':user.first_name,
                      'last_name':user.last_name,
                      'role':user.role
                    },
                    
                    'access':token.get('access'),
                    'refresh':token.get('refresh')
                }
                
            else: 
                raise AuthenticationFailed({'passowrd' : 'incorect password'})
        else:
            raise NotFound({'email':'user with this mail is not found'})
            
         
        
    
        

        


   




class GoogleSiginSerializer(serializers.Serializer):
    access_token = serializers.CharField(min_length=6)
    
    

    # validating the access token using the google python client
    def validate_access_token(self,access_token):

    


        google_user_data = Google.validate(access_token)
        
        user_data = Google.validate(access_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )
       
        if user_data['aud'] != settings.GOOGLE_CLIENT_ID:

            raise serializers.ValidationError('your are not google user')

        else:
            if google_user_data['aud'] != settings.GOOGLE_CLIENT_ID:
            
              raise AuthenticationFailed(detail="you could not verify a user")
        
            return register_social_user(
                email=google_user_data['email'],
                first_name = google_user_data['given_name'],
                last_name  = google_user_data.get('family_name',None)
            )

             


   


class UserEmailActivationSerializer(serializers.Serializer):

    access_token = serializers.CharField(min_length=6) 

    def validate_access_token(self,data):
         
        access_token =  data
        print(f"{access_token} this is a token")
        user_id = verify_token(access_token)
        print(user_id)
        if user_id:
            user = MyUser.objects.get(id=user_id)
            user.is_active = True
            user.save()
            return {
        
                'user':user
            }
        else:
            raise serializers.ValidationError('Invalid Token or Expired Token')





class UserUpdateSerializer(serializers.ModelSerializer):
        

    email      = serializers.EmailField()
    first_name = serializers.CharField(required=False)
    last_name  = serializers.CharField(required=False)

    def validate(self,data) -> dict[str:str] :
        print(self.context)
        request = self.context.get('request')
        user   = request.user 
        print(f'requst {request}')
        if MyUser.objects.exclude(pk=user.pk).filter(email=data['email']).exists():
            raise serializers.ValidationError(
                    
                    {'email':'email is already taken'}

            )          
        return data
    

    def update(self,instance,validated_data):
        
            instance.email =  validated_data.get('email',instance.email)
            instance.first_name = validated_data.get('first_name',instance.first_name)
            instance.last_name  = validated_data.get('last_name',instance.last_name)
            instance.save()
            return instance
        

    class Meta:
            model = UserViewSerailizer.Meta.model
            fields = [
                'email',
                'first_name',
                'last_name',
            ]
        
    

class ShippingAddressSerializer(serializers.ModelSerializer):
    
    
    user     = UserViewSerailizer(read_only=True) 
    state    = serializers.ChoiceField(choices=ShippingAddress.state_choices)
    pin_code = serializers.CharField(max_length=6,min_length=4)
    
    
    
    def create(self,validated_data):
        
        request  = self.context.get('request',None)
        user = {
            'user':request.user
        } 
        validated_data.update(user)
        instance = ShippingAddress.objects.create(**validated_data)
        
        return instance 
    
    
    class Meta:
        model  =  ShippingAddress
        fields =  '__all__'




    










            
         

