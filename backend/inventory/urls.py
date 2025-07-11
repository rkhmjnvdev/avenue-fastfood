from rest_framework.routers import DefaultRouter
from .views import IngredientViewSet

router = DefaultRouter()
router.register(r'ingredients', IngredientViewSet)

urlpatterns = router.urls
