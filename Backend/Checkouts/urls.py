from django.urls import path
from . import views
urlpatterns = [
    path('create',views.OrderCreateApiView.as_view(),name="order"),
]
