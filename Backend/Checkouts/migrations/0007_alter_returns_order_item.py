# Generated by Django 4.2.7 on 2024-01-06 03:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checkouts', '0006_returns'),
    ]

    operations = [
        migrations.AlterField(
            model_name='returns',
            name='order_item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='checkouts.orderitems'),
        ),
    ]
