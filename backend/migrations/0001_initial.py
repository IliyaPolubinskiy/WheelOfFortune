# Generated by Django 4.1.5 on 2023-01-26 05:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Winners',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('winning_amount', models.IntegerField(verbose_name='Сумма выигрыша')),
                ('win_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата и время выигрыша')),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Победитель')),
            ],
        ),
        migrations.CreateModel(
            name='UserBalance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.IntegerField(default=1000, verbose_name='Баланс')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Баланс')),
            ],
        ),
    ]
