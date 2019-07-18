from django.db import models


# Create your models here.
class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    task = models.CharField(max_length=200, unique=True)
    checked = models.BooleanField()

    def __str__(self):
        return self.task
