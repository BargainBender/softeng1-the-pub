# Generated by Django 4.2.5 on 2023-10-29 12:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='thread',
            name='depth',
        ),
    ]
