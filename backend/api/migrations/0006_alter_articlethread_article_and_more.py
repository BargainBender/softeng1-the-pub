# Generated by Django 4.2.5 on 2023-10-30 13:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_articlethreads_articlethread'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlethread',
            name='article',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='threads', to='api.article'),
        ),
        migrations.AlterField(
            model_name='articlethread',
            name='thread',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='api.thread'),
        ),
    ]