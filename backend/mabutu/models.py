from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Commentaire de {self.user.username} sur {self.post.title}"

    class Meta:
        ordering = ['-created_at']

class EmojiReaction(models.Model):
    EMOJI_CHOICES = [
        ('👍', 'Pouce en haut'),
        ('❤️', 'Cœur'),
        ('😂', 'Rire'),
        ('😮', 'Surprise'),
        ('😢', 'Triste'),
    ]
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reactions')
    emoji = models.CharField(max_length=5, choices=EMOJI_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'user', 'emoji')

    def __str__(self):
        return f"{self.user.username} a réagi avec {self.emoji} à {self.post.title}"

class Customer(models.Model):
    name = models.CharField(max_length=240, verbose_name='Name')
    email = models.EmailField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
