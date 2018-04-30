from django.db import models

class Pet(models.Model):
  name = models.CharField(max_length=50)
  animal_type = models.CharField(max_length=50)
