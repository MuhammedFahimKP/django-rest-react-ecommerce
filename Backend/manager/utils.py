from uuid import UUID
from rest_framework.exceptions import NotFound


def is_valid_uuid(uuid_to_test, version=4):
    """
    Check if uuid_to_test is a valid UUID.
    
     Parameters
    ----------
    uuid_to_test : str
    version : {1, 2, 3, 4}
    
     Returns
    -------
    `True` if uuid_to_test is a valid UUID, otherwise `False`.
    
     Examples
    --------
    >>> is_valid_uuid('c9bf9e57-1685-4c89-bafb-ff5af830be8a')
    True
    >>> is_valid_uuid('c9bf9e58')
    False
    """
    
    
    try:
        uuid_obj = UUID(uuid_to_test, version=version)
        
    except ValueError:    
        raise NotFound()
            
    
    if str(uuid_obj) == uuid_to_test :
        return uuid_to_test
