from django.db import models

# Create your models here.


class Hero(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    name = models.TextField(null=False)

    def __str__(self):
        return self.name


class User(models.Model):
    username = models.TextField(null=False, primary_key=True)
    password = models.TextField(null=False)
    name = models.TextField(null=False)
    authority = models.IntegerField(default=0, null=False)

    def __str__(self):
        return self.name
