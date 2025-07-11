# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Ingredient
from .serializers import IngredientSerializer

class IngredientViewSet(ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
