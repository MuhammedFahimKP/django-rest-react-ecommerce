# Generated by Django 4.2.7 on 2024-01-06 05:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0033_delete_returns'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariant',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='shop.product'),
        ),
    ]
