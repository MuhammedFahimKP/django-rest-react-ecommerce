# Generated by Django 4.2.7 on 2023-12-13 07:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0008_product_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='description',
            new_name='discription',
        ),
    ]
