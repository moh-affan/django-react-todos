from django.db import models


# Create your models here.
class Todo(models.Model):
    task = models.CharField(max_length=200, unique=True)
    checked = models.BooleanField()

    def __str__(self):
        return self.task
