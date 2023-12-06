# Generated by Django 4.2.7 on 2023-12-05 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_alter_userprofile_bio'),
        ('api', '0013_articletag_unique_article_tag_tag_unique_tag'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='preferred_tags', to='core.userprofile')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profiles', to='api.tag')),
            ],
        ),
        migrations.AddConstraint(
            model_name='profiletag',
            constraint=models.UniqueConstraint(fields=('profile', 'tag'), name='unique_profile_tag'),
        ),
    ]
