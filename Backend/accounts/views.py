from django.shortcuts import render
from django.template.loader  import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .models import MyUser as User,ShippingAddress 
from ecom.mixins import JWTPermission 
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


from .thread import EmailThread
# from .models import ShippingAddress
# Create your views here.

from rest_framework import generics,status,permissions
from .serializers import (
    
    UserRegisterSerialzer,
    UserSignInSerializer,
    UserEmailActivationSerializer,
    GoogleSiginSerializer,
    UserUpdateSerializer,
    ShippingAddressSerializer,
    ChangePasswordSerializer,

)

from rest_framework.response import Response


from .utils import verify_user


from .task import send_activation_email
from  .models import MyUser




class UserRegisterApiView(generics.GenericAPIView):
    #my user serializer class for creating users
    serializer_class = UserRegisterSerialzer

    #post method only allow

    def post(self,request):

        #taking the post data   
        user_data = self.request.data

        #sending the data to the serializer
        serializer = self.serializer_class(data=user_data)

        """
        checking serializer is valid if serialzer is not valid it will send serailizor error with http 400   

        """    
        if serializer.is_valid(raise_exception=True):

            #creating new user  object using serializer create method
            
            serializer.save()

            #taking the serializer data for response sending activation link

            user = serializer.data
            
            
        
            
            #calling thread class to send email
            
            print(user)
            
            
            send_activation_email.delay(user['id'],user['email'])

            
            #returning the response with http 201
       
          
            return Response({
                'data':user,
                'message':f'hi {user['first_name']} thanks for siging up please check your mail for confirmation  ',
            },status=status.HTTP_201_CREATED) 
           
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 




 


    
class UserProfileRetriveAPIView(JWTPermission,generics.RetrieveAPIView):

    queryset = User.objects.all()
    serializer_class   = UserRegisterSerialzer




class BlackListTokenView(APIView):

    permission_classes = [permissions.AllowAny]



    #allow post method only
     
    def post(self,request):

        "geeting the refreash token if there is no refreash token exception  "

        try:

            #refreash token geting 
            refresh_token = self.request.data['refresh']
            
            
            token = RefreshToken(refresh_token)
            
            #blacklisting the token
            token.blacklist()
            

            #sending response htttp 204

            return Response({
                "User Signouted"
            },status=status.HTTP_204_NO_CONTENT)

        except Exception as E:
            return Response(

                {str(E)},

                status=status.HTTP_400_BAD_REQUEST,
            )    




class UserSigninAPIView(generics.GenericAPIView):

    
    serializer_class = UserSignInSerializer
    
    

    #allow only post method
    def post(self,request):
     
        #passing the data to the serializer
        serialzer = self.serializer_class(data=self.request.data)
         
        #if serializer valid then it will send a data with http 200 
        if serialzer.is_valid(raise_exception=True):
            return Response(serialzer.data,status=status.HTTP_200_OK)
        
        #otherwise it will send data serializer error with http 400 
        return Response(serialzer.errors,status=status.HTTP_400_BAD_REQUEST)


class SignInApiView(generics.GenericAPIView):
    serializer_class = UserSignInSerializer
    
    def post(self,request):
        print(request)
        #passing the data to the serializer
        serialzer = self.serializer_class(data=self.request.data)
         
        #if serializer valid then it will send a data with http 200 
        if serialzer.is_valid(raise_exception=True):
            return Response(serialzer.data,status=status.HTTP_200_OK)
        
        #otherwise it will send data serializer error with http 400 
        return Response(serialzer.errors,status=status.HTTP_400_BAD_REQUEST)




class GoogleUserSiginAPIView(generics.GenericAPIView):

    serializer_class = GoogleSiginSerializer

    #allow post method only
    def post(self,request):    
         
        # sending data to serializer  
        serializer = self.serializer_class(data=request.data)
        
        #if serializer valid then it will send a data with http 200
        if serializer.is_valid(raise_exception=True):
            data = ((serializer.validated_data)['access_token'])
            return Response(data,status=status.HTTP_200_OK)

        
        # other wise it will send a 400 http response with serializer error
    
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserUpdateApiView(JWTPermission,generics.GenericAPIView):
   
    serializer_class = UserUpdateSerializer

    #post method only allow

    def patch(self,request):

        #taking the post data   
    
        #sending the data to the serializer
        serializer = self.serializer_class(data=request.data,context={'request':request})

        """
        checking serializer is valid if serialzer is not valid it will send serailizor error with http 400   

        """    
        if serializer.is_valid(raise_exception=True):

            #creating new user  object using serializer create method
            
            serializer.save()

            #taking the serializer data for response sending activation link

            user = serializer.data
            
            #calling thread class to send email

            
            #returning the response with http 
        
            return Response({
                'data':user,
                'message':f'hi {user['first_name']} profile updated ',
            },status=status.HTTP_202_ACCEPTED) 
         
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 



    
class UserActivaionApiView(generics.GenericAPIView):
    

     # sending data to serializer  
    serializer_class = UserEmailActivationSerializer
    
    

    #if serializer valid then it will send a data with http 200
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        
        
    


        if serializer.is_valid(raise_exception=True):
            

            user_id = serializer.data['access_token']
    
            user = verify_user(user_id)
                
            if  user:
                    
                return Response({
                    'message':f'hi {user.first_name}  your account activated successfully ',
                },status=status.HTTP_200_OK) 
         
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
  
    



class UserChangePasswordAPIView(generics.GenericAPIView) :
    serializer_class = ChangePasswordSerializer
    
    def patch(self,request):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        
        if  serializer.is_valid(raise_expection=True):
            
            password  = serializer.data['new_password']
            
            user = request.user 

            user.set_password(password)
            
            user.save()
            
    
        
            return Response({'password':'changed'},status=status.HTTP_200_OK)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

    
    
    
    
    
class ShippingAddressListCreateApiView(JWTPermission,generics.GenericAPIView):
    
    serializer_class = ShippingAddressSerializer
    queryset           = ShippingAddress.objects.all()
    
    def get_queryset(self,*args, **kwargs):
            
            
            
            
        #Taking the current user  for  filter thier address

        user = self.request.user
            
        """
        filter the address of the current user
           
        """
            
        qs = super().get_queryset(*args,**kwargs)
        return qs.filter(user=user)
        
        
        
    
    def post(self,request,*args, **kwargs):
        
        serializer = self.get_serializer_class()
        
        serializer = serializer(data=request.data,context={'request':request})
        


        
        if serializer.is_valid(raise_exception=True):
            
            serializer.save()
            
            return Response(serializer.data,status=201)
        
        return Response(serializer.errors,status=404)        
    
    def get(self,reqeust,*args, **kwargs):
            
        models      = self.get_queryset()
    
        serializer  = self.get_serializer(models,many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)






class ShippingAddressDeleteUpdateRetrieveApiView(JWTPermission,generics.RetrieveUpdateDestroyAPIView):
    
    
    
    serializer_class = ShippingAddressSerializer
    queryset         = ShippingAddress.objects.all()
    lookup_field     = 'pk'
    

from django.template.loader import get_template    
from django.contrib.sites.shortcuts import get_current_site
class HaiAPIview(generics.GenericAPIView):
    
    def get(self,request):
        
       
       
    
    
        # site = get_current_site(request)
    
        


    # Render the email template
        # subject = "Activate Your Account"
        # template = get_template('Activation.html')
        # context = {
        #     'STATIC_URL': settings.STATIC_URL,
        #     'domain' :site.domain
            
        # }
        
        
        # html_content = template.render(context)

       
          
        # send_mail(subject='Account Activation',message='',html_message=html_content, from_email=settings.EMAIL_HOST_USER,recipient_list=['salmanulfaris.c.k10@gmail.com'])
        
        
        
        
        
        
        return Response({
            'hai':'hello'
            
        },status=status.HTTP_200_OK)
        
            
            
        
       
    
    
    
    









































































































































































































