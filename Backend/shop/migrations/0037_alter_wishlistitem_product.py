# Generated by Django 4.2.7 on 2024-07-22 02:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0036_alter_wishlistitem_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wishlistitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.productvariant'),
        ),
    ]
