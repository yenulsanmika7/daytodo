# Generated by Django 4.2.4 on 2023-08-29 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_todo_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='description',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
