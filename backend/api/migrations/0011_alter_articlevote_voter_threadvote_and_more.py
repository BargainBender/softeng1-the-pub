# Generated by Django 4.2.7 on 2023-12-01 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_userprofile_bio'),
        ('api', '0010_articlevote_unique_article_voter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articlevote',
            name='voter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_votes', to='core.userprofile'),
        ),
        migrations.CreateModel(
            name='ThreadVote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_upvote', models.BooleanField(default=True)),
                ('thread', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='api.thread')),
                ('voter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thread_votes', to='core.userprofile')),
            ],
        ),
        migrations.AddConstraint(
            model_name='threadvote',
            constraint=models.UniqueConstraint(fields=('voter', 'thread'), name='unique_thread_voter'),
        ),
    ]
