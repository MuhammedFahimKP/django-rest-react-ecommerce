from rest_framework import serializers
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator

"""
iam just created a lowercase  only acceptable field with vlidators

validators are  Regex validator


"""




class LowercaseCharField(serializers.CharField):
   
    def __init__(self,queryset,max_length,min_length=None,*args, **kwargs):
        kwargs['max_length'] = max_length 
        kwargs['min_length'] = min_length  if min_length else 4
        kwargs['validators'] = [RegexValidator(regex='^[a-z]*$',message='Only lowercase letters are allowed.'),UniqueValidator(queryset=queryset)]
        super().__init__(*args, **kwargs)
