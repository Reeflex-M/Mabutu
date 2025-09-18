from django.urls import path
from .views import (
    PostList,
    PostDetail,
    CommentList,
)
from . import views


urlpatterns = [
    path('auth/user/', views.get_user_info, name='user_info'),
    path('auth/register/', views.register_user, name='register'),
    
    #gestion des posts
    path('posts/', PostList.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    
    #gestion des commentaires
    path('posts/<int:post_id>/comments/', CommentList.as_view(), name='post-comments'),
]
