from rest_framework import viewsets
from .serializers import DinosaurSerializer, CategorySerializer
from ..models import Dinosaur
from ..models import Category

class DinosaurViewSet(viewsets.ModelViewSet):
    queryset = Dinosaur.objects.all()
    serializer_class = DinosaurSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer