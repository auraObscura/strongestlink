# Generated by Django 4.0.4 on 2022-05-09 16:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('strongest_link_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardio',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='cardio', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='weightlifting',
            name='user',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='lifts', to=settings.AUTH_USER_MODEL),
        ),
    ]
