# Generated by Django 4.1.5 on 2023-02-22 13:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_winners_winner'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Settings',
        ),
        migrations.RemoveField(
            model_name='socialaccount',
            name='network',
        ),
        migrations.RemoveField(
            model_name='socialaccount',
            name='user',
        ),
        migrations.DeleteModel(
            name='VKToken',
        ),
        migrations.DeleteModel(
            name='SocialAccount',
        ),
        migrations.DeleteModel(
            name='SocialNetwork',
        ),
    ]
