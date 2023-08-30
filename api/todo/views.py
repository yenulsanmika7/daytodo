from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import ToDo, Category
from .serializer import TodoSerializer, CategorySerializer

# Create your views here.
@api_view(['GET'])  
@permission_classes([AllowAny])
def home(request):
    routes = [
        {
            'Endpoint': '/tasks/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of Tasks'
        },
        {
            'Endpoint': '/task/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single task with detailed object'
        },
        {
            'Endpoint': '/task/create/',
            'method': 'POST',
            'body': {'body': "Title, Description"},
            'description': 'Creates new task with data sent in post request'
        },
        {
            'Endpoint': '/task/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/task/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting task'
        },
    ]
    return Response(routes)

@api_view(['GET'])
@permission_classes([AllowAny])
def getTodo(request):
    tasks = ToDo.objects.all().order_by('completed')
    serializer = TodoSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getToDoItem(request, pk):
    task = ToDo.objects.get(id=pk)
    serializer = TodoSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createToDo(request):
    data = request.data

    task = ToDo.objects.create(
        title=data['title'],
        description=data['description'],
    )
    serializer = TodoSerializer(task, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([AllowAny])
def updateTodo(request, pk):
    data = request.data
    task = ToDo.objects.get(id=pk)
    serializer = TodoSerializer(instance=task, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def deleteTodo(request, pk):
    task = ToDo.objects.get(id=pk)
    task.delete()
    return Response(f'Task Number {pk} was deleted successfully!')
