from django.urls import path
from . import views
urlpatterns = [
    path('',views.OrderCreateApiView.as_view(),name="order"),
    # path('list/',views.OrderListApiView.as_view()),
]
