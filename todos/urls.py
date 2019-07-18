from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

from todo.views import TodoView, ApiTodo

urlpatterns = [
    path('', include('todo.urls')),
    path('admin/', admin.site.urls),
    path('todo/', TodoView.as_view()),
    # path('api/', csrf_exempt(ApiTodo.as_view())),
    path('api/', ensure_csrf_cookie(ApiTodo.as_view())),
]
