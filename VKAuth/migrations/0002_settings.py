# Generated by Django 4.1.5 on 2023-02-22 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VKAuth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=50)),
                ('value', models.CharField(max_length=500)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
    ]
