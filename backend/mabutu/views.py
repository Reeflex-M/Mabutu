from django.shortcuts import render
from .models import Post, Comment
from rest_framework import generics, status, permissions
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        #lecture autorisée pour tous
        if request.method in permissions.SAFE_METHODS:
            return True
        
        #ecriture autorisée uniquement pour les admins
        return request.user and request.user.is_staff


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post_id=post_id)
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        serializer.save(user=self.request.user, post_id=post_id)

#page profil d'un user -> besoin d'un JWT valide
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff
    }
    return Response(data)


#inscription d'un user
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "Inscription réussie",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
