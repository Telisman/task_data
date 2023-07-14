
from django.urls import path
from .views import home,your_api_endpoint
urlpatterns = [
    path('', home),
    path('endpoint/', your_api_endpoint, name='your_api_endpoint'),

]
