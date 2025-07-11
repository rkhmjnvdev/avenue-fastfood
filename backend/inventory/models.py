from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    unit = models.CharField(max_length=10)
    stock = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
