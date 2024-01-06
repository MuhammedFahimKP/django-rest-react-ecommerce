from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from .models import MyUser,ShippingAddress
from .utils import Google,register_social_user,verify_token
from .thread import EmailThread
from django.contrib.auth import authenticate
from .task import send_mail




# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     def get_token(cls,user):
#         token = super().get_token()

#         token['email'] = user.email

#         return token



 




class UserRegisterSerialzer(serializers.ModelSerializer):

    password  = serializers.CharField(max_length=68,min_length=8,write_only=True)
    password2 = serializers.CharField(max_length=68,min_length=8,write_only=True)
    email     = serializers.EmailField(max_length=68,min_length=8,validators=[
        UniqueValidator(queryset=MyUser.objects.all())
    ])

    class Meta:
        model  = MyUser
        fields =  [
            'email',
            'first_name',
            'last_name',
            'password',
            'password2',
        ] 


    def validate(self,attrs):
        password  = attrs.get('password','')
        password2 = attrs.get('password2','')
    

        if password != password2 :
            raise serializers.ValidationError('passwords do not match')
        
        return attrs   
    
    

    def create(self,validated_data):
        validated_data.pop('password2')
        return super().create(validated_data)
    


         


    
    


class UserSignInSerializer(serializers.ModelSerializer):


    """
      taking email and password from the client 
    """




    email = serializers.EmailField(max_length=255)
    password =  serializers.CharField(write_only=True)


    """
    
    sending  jwt(for the user),email,name of the user to the client 

    """


    access_token = serializers.CharField(max_length=255,read_only=True)
    refresh_token = serializers.CharField(max_length=255,read_only=True)
    name = serializers.CharField(max_length=255,read_only=True)




    class Meta:

        model = MyUser
        fields = [
            'email',
            'name',
            'password',
            'access_token',
            'refresh_token',
            
        ]

    def validate(self,attrs):

        """
            taking password and email from client
        """
        email = attrs.get('email')
        password = attrs.get('password')
        
        """
            authenticate function while return a user object if creadentials are ok
            otherwise it return a None 
            
        """

        user = authenticate(email=email,password=password)
    
        """
         checking is user none or not if none it while raise expection authentication failed as expection
        """
        if not user:
            raise serializers.ValidationError("please provide valid mail and password ")
        

        """
         Taking tokens for the corsponding user

        """
        token=user.tokens

        """
        
        returning the email,name,Token keys(access refresh keys) of the user to client
        
        """

        return {
            'email':user.email,
            'name':f"{user.first_name}  {user.last_name}",
            'access_token':str(token.get('access')),
            'refresh_token':str(token.get('refresh'))
        }


   




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


class UserViewSerailizer(serializers.ModelSerializer):

    email      = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name  = serializers.CharField(read_only=True)


    class Meta:
        model = MyUser
        fields = [
            'email',
            'first_name',
            'last_name',
        ]


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




    










            
         

