from . import views
from django.urls import path

app_name = 'todo'

urlpatterns = [
    path('', views.home, name="routes"),
    path('all/', views.getTodo, name="task-list"),
    path('task/<str:pk>', views.getToDoItem, name="task-details"),

    path('add/', views.createToDo, name="create-task"),
    path('update/<str:pk>', views.updateTodo, name="update-task"),
    path('delete/<str:pk>', views.deleteTodo, name="delete-task"),
]
