# Generated by Django 4.2.7 on 2024-07-22 02:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0036_alter_wishlistitem_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wishlistitem',
            name='product',
        ),
        migrations.RemoveField(
            model_name='wishlistitem',
            name='wishlist',
        ),
        migrations.DeleteModel(
            name='WishList',
        ),
        migrations.DeleteModel(
            name='WishListItem',
        ),
    ]
