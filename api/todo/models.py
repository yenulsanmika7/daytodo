from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ToDo(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    completed = models.BooleanField(default=False, blank=True, null=True)
    updated = models.BooleanField(default=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField(auto_now_add = True, auto_now = False, blank = True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['completed']
    
class Category(models.Model):
    task = models.ForeignKey(ToDo, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.task + self.name