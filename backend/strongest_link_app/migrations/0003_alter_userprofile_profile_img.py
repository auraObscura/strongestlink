# Generated by Django 4.0.4 on 2022-05-06 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('strongest_link_app', '0002_remove_location_attendees_location_attendees'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_img',
            field=models.URLField(blank=True, default='https://files.slack.com/files-pri/T0EGY7J3X-F03EEAXU9EE/sl-user.png', null=True),
        ),
    ]