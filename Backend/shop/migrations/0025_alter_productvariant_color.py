# Generated by Django 4.2.7 on 2023-12-28 09:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0024_remove_productvariantimages_color_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productvariant',
            name='color',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='shop.color'),
        ),
    ]