from django.core.exceptions import ObjectDoesNotExist






def get_or_none(class_model,**kwargs) -> object or None:

   
    try:
        
        instance = class_model.objects.get(**kwargs)

        
        return instance
    
    except ObjectDoesNotExist:

        

        return None    
    

def get_or_create(class_model,**kwargs) -> object:
    

    try:
        instance = class_model.objects.get(**kwargs)
    except ObjectDoesNotExist:
        instance = class_model.objects.create(**kwargs)

    return instance

