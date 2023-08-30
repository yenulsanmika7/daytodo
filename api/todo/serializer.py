from rest_framework import serializers
from .models import ToDo, Category

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ["id", "description", "title", "completed", "created_at", "timestamp", "updated"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "task"]