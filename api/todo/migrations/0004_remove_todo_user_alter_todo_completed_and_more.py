# Generated by Django 4.2.4 on 2023-08-29 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_todo_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='user',
        ),
        migrations.AlterField(
            model_name='todo',
            name='completed',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='todo',
            name='updated',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
