import json

from basicauth.decorators import basic_auth_required
from django.http import JsonResponse
from django.shortcuts import render
# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from django.views.generic import TemplateView

from todo.models import Todo


def index(request):
    return render(request, 'index.html')


class TodoView(TemplateView):
    template_name = 'todo.html'


class ApiTodo(View):
    @method_decorator(basic_auth_required, name='get')
    def get(self, request, *args, **kwargs):
        todos = Todo.objects.all()
        data = []
        for todo in todos:
            data.append({'id': todo.id, 'task': todo.task, 'checked': todo.checked})
        return JsonResponse({'result': data}, safe=False)

    @method_decorator(basic_auth_required, name='post')
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        _todo = data['todo']
        action = data['action']
        if action == 'create':
            todo = Todo(task=_todo['task'], checked=_todo['checked'])
            todo.save()
            return JsonResponse(
                {'success': True, 'result': {'id': todo.id, 'task': todo.task, 'checked': todo.checked}})
        elif action == 'check_changed':
            todo = Todo.objects.get(id=_todo['id'])
            todo.checked = _todo['checked']
            todo.save()
            return JsonResponse(
                {'success': True, 'result': {'id': todo.id, 'task': todo.task, 'checked': todo.checked}})
        elif action == 'delete':
            todo = Todo.objects.get(id=_todo['id'])
            todo.delete()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Action is invalid'})
