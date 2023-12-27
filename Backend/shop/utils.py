from django.core.exceptions import ObjectDoesNotExist






def get_or_none(class_model,**kwargs) -> object or None:

    #accepting models class and attributes
    try:

        
        
        instance = class_model.objects.get(**kwargs)

        #instance is get by attribute

        #then returning the instance  
        return instance
    
    #if there is no object exist by attribute

    
    except ObjectDoesNotExist:

        #then returning None

        return None    
    

def get_or_create(class_model,**kwargs) -> object:
    #accepting models class and attributes    

    try:
        
        instance = class_model.objects.get(**kwargs)
        #instance is get by attribute

    #if there is no object exist by attribute      
    except ObjectDoesNotExist:
        
        instance = class_model.objects.create(**kwargs)

        #then create  an instance by attributes

    #returning the instance
    return instance


