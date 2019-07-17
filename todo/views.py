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
        # return JsonResponse({'result': todos[::1]})
        data = []
        for todo in todos:
            data.append({'task': todo.task, 'checked': todo.checked})
        return JsonResponse({'result': data}, safe=False)

    @method_decorator(basic_auth_required, name='post')
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode())
        try:
            todo = Todo(task=data['task'], checked=data['checked'])
            todo.save()
            return JsonResponse({'success': True})
        except:
            return JsonResponse({'error': True})
