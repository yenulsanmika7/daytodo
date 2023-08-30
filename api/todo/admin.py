from django.contrib import admin
from .models import ToDo, Category

# Register your models here.
admin.site.register(ToDo)
admin.site.register(Category)