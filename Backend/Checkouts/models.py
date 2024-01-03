from django.db import models
from django.core.validators import MinValueValidator


from BaseModels.models import BaseModel
from accounts.models import MyUser as User,ShippingAddress as Address
from shop.models import ProductVariant
# Create your models here.

class Order(BaseModel):
    
    payment_choices = [
        
        ("COD", "Cash On Delivery"),
        ("UPI","UPI Payment")
    
    ]
    
    payment_staus = [
        
        ("Pending", "Pending"),
        ("Paid","Paid")
    
    ]
    
    status_choices = [
        
        ('Cancelled', "Cancelled"),
        ('Placed',"Placed"),
        ("Delivered","Delivered")
    ]
    
    user           = models.ForeignKey(User, on_delete=models.CASCADE)
    address        = models.ForeignKey(Address, on_delete=models.CASCADE)
    total_amount   = models.DecimalField(max_digits=10, decimal_places=2)
    status         = models.CharField(max_length=12,choices=status_choices)
    payment        = models.CharField(max_length=3, choices=payment_choices)
    payment_staus  = models.CharField(max_length=7,choices=payment_staus)
    
    """
     
     this field only used for upi payment or other net banking serivces 
     
    """
    payment_transation_id = models.CharField(max_length=200,null=True)
    
    
    
    def delete(self):
        
        self.status = 'Cancelled'     
        self.save()
        
    
    
    
    
class OrderItems(BaseModel):
    
    order    = models.ForeignKey(Order,on_delete=models.CASCADE)
    product  = models.ForeignKey(ProductVariant,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1,validators=[MinValueValidator(1)])
    
    # @property
    # def sub_total(self) -> int :
    #     return self.product.price * self.quantity
        
        