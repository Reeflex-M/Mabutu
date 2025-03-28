from django.urls import path
from .views import (
    CustomerCreate,
    CustomerList,
    CustomerDetail,
    CustomerUpdate,
    CustomerDelete,
)
from . import views


urlpatterns = [
    path("create/", CustomerCreate.as_view(), name="create-customer"),
    path("", CustomerList.as_view()),
    path("<int:pk>/", CustomerDetail.as_view(), name="retrieve-customer"),
    path("update/<int:pk>/", CustomerUpdate.as_view(), name="update-customer"),
    path("delete/<int:pk>/", CustomerDelete.as_view(), name="delete-customer"),
    path('auth/user/', views.get_user_info, name='user_info'),
]
