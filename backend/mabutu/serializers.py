from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User

#gestion des utilisateurs
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
    

#gestion des posts
class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'created_at', 'updated_at', 'author', 'author_username')
        read_only_fields = ('author', 'created_at', 'updated_at')
    
    def get_author_username(self, obj):
        return obj.author.username
    
    def create(self, validated_data):
        # auteur attribué auto a l'user admin connecte
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)




#gestion des commentaires
class CommentSerializer(serializers.ModelSerializer):
    user_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ('id', 'content', 'created_at', 'post', 'user', 'user_username')
        read_only_fields = ('user', 'created_at')
    
    def get_user_username(self, obj):
        return obj.user.username
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

