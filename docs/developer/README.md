# Documentation développeur - Mabutu

## 🎯 Vue d'ensemble développeur

Ce guide s'adresse aux développeurs souhaitant comprendre, modifier ou étendre l'application Mabutu. Il couvre l'architecture, les patterns utilisés et les bonnes pratiques de développement.

## 🏗️ Architecture du code

### Séparation des responsabilités

```
Frontend (React)          Backend (Django)
├── Presentation Layer     ├── API Layer
├── Business Logic         ├── Business Logic  
├── Data Access           ├── Data Access Layer
└── State Management      └── Database
```

### Patterns de design utilisés

#### Frontend
- **Component-based architecture** : Composants React réutilisables
- **Hooks pattern** : useState, useEffect pour la gestion d'état
- **Context API** : Gestion d'état global pour l'authentification
- **Service pattern** : Services dédiés pour API et authentification

#### Backend
- **MVT (Model-View-Template)** : Architecture Django standard
- **Repository pattern** : Models Django comme repositories
- **Serializer pattern** : DRF pour transformation des données
- **Permission classes** : Gestion granulaire des autorisations

## 🎨 Structure du Frontend

### Arborescence des composants

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.js           # Formulaire de connexion
│   │   ├── Register.js        # Formulaire d'inscription
│   │   └── PrivateRoute.js    # Route protégée
│   ├── posts/
│   │   ├── PostList.js        # Liste des posts
│   │   ├── PostDetail.js      # Détail d'un post
│   │   └── CreatePost.js      # Création de post (admin)
│   ├── user/
│   │   └── Profile.js         # Profil utilisateur
│   └── common/
│       ├── Navigation.js      # Barre de navigation
│       ├── Loading.js         # Composant de chargement
│       └── ErrorMessage.js    # Affichage des erreurs
├── services/
│   ├── api.service.js         # Service HTTP principal
│   ├── auth.service.js        # Service d'authentification
│   └── auth-header.js         # Headers d'authentification
├── context/
│   └── AuthContext.js         # Contexte d'authentification
├── utils/
│   ├── constants.js           # Constantes globales
│   └── helpers.js             # Fonctions utilitaires
└── styles/
    ├── index.css              # Styles Tailwind
    └── App.css                # Styles spécifiques
```

### Flux de données React

```
App.tsx
├── AuthContext.Provider
│   ├── Navigation
│   └── Routes
│       ├── Login
│       ├── Register
│       ├── PrivateRoute
│       │   ├── Profile
│       │   ├── PostList
│       │   │   └── PostDetail
│       │   └── CreatePost (admin only)
```

### Gestion d'état

#### État local (useState)
```javascript
// Pour les données spécifiques au composant
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

#### État global (Context API)
```javascript
// Pour l'authentification
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Services et API

#### Structure du service API
```javascript
// api.service.js
class ApiService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL;
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Intercepteur pour l'authentification
    this.http.interceptors.request.use(this.authInterceptor);
    this.http.interceptors.response.use(
      response => response,
      error => this.handleError(error)
    );
  }
  
  // Méthodes CRUD
  get(endpoint) { return this.http.get(endpoint); }
  post(endpoint, data) { return this.http.post(endpoint, data); }
  put(endpoint, data) { return this.http.put(endpoint, data); }
  delete(endpoint) { return this.http.delete(endpoint); }
}
```

## 🔧 Structure du Backend

### Architecture Django

```
backend/
├── main/                    # Projet Django principal
│   ├── settings.py         # Configuration globale
│   ├── urls.py             # URLs principales
│   ├── wsgi.py             # Interface WSGI
│   └── asgi.py             # Interface ASGI
└── mabutu/                 # Application principale
    ├── models.py           # Modèles de données
    ├── views.py            # Vues API
    ├── serializers.py      # Sérialiseurs DRF
    ├── urls.py             # URLs de l'app
    ├── admin.py            # Interface admin
    ├── permissions.py      # Permissions customisées
    └── migrations/         # Migrations base de données
```

### Modèles de données

#### User (Django Auth étendu)
```python
# Utilisation du modèle User standard de Django
from django.contrib.auth.models import User

# Extensions via le profil ou signaux si nécessaire
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    bio = models.TextField(blank=True)
```

#### Modèles principaux
```python
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']

class EmojiReaction(models.Model):
    EMOJI_CHOICES = [
        ('👍', 'Thumbs Up'),
        ('❤️', 'Heart'),
        ('😂', 'Laugh'),
        ('😮', 'Wow'),
        ('😢', 'Sad'),
    ]
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reactions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reactions')
    emoji = models.CharField(max_length=5, choices=EMOJI_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('post', 'user', 'emoji')
```

### Vues et sérialiseurs

#### ViewSets et permissions
```python
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    def get_queryset(self):
        # Optimisation avec select_related
        return Post.objects.select_related('author').prefetch_related('comments')

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        post_id = self.kwargs.get('post_pk')
        return Comment.objects.filter(post_id=post_id).select_related('user')
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_pk')
        serializer.save(user=self.request.user, post_id=post_id)
```

#### Sérialiseurs avancés
```python
class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    reactions_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 
                 'author', 'author_username', 'comments_count', 'reactions_count']
        read_only_fields = ['author', 'created_at', 'updated_at']
    
    def get_author_username(self, obj):
        return obj.author.username
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_reactions_count(self, obj):
        return obj.reactions.count()
```

### Permissions personnalisées

```python
class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permission qui autorise la lecture pour tous,
    mais l'écriture uniquement pour les administrateurs.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission qui autorise la lecture pour tous,
    mais l'écriture uniquement pour le propriétaire.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user
```

## 🔐 Authentification et sécurité

### JWT Configuration

```python
# settings.py
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}
```

### Gestion côté frontend

```javascript
// auth.service.js
class AuthService {
  login(username, password) {
    return axios.post('/api/auth/token/', { username, password })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem('token', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
        }
        return response.data;
      });
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
  
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      return axios.get('/api/auth/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return Promise.reject('No token');
  }
  
  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return axios.post('/api/auth/token/refresh/', {
      refresh: refreshToken
    }).then(response => {
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
      }
      return response.data;
    });
  }
}
```

## 🎨 Styling et UI

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Composants UI réutilisables

```javascript
// components/common/Button.js
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  }`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Chargement...
        </div>
      ) : children}
    </button>
  );
};
```

## 🧪 Tests et qualité

### Tests Frontend (Jest + React Testing Library)

```javascript
// components/__tests__/Login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import authService from '../../services/auth.service';

// Mock du service d'authentification
jest.mock('../../services/auth.service');

const LoginWrapper = () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders login form', () => {
    render(<LoginWrapper />);
    
    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
  });
  
  test('submits login form with valid data', async () => {
    const mockLogin = authService.login.mockResolvedValue({ access: 'token' });
    
    render(<LoginWrapper />);
    
    fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });
});
```

### Tests Backend (Django TestCase)

```python
# mabutu/tests.py
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post, Comment

class PostAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(
            username='admin',
            password='testpass123',
            is_staff=True
        )
        self.regular_user = User.objects.create_user(
            username='user',
            password='testpass123'
        )
        self.post = Post.objects.create(
            title='Test Post',
            content='Test content',
            author=self.admin_user
        )
    
    def test_get_posts_list(self):
        """Test récupération de la liste des posts"""
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
    
    def test_create_post_as_admin(self):
        """Test création de post par un admin"""
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'title': 'New Post',
            'content': 'New content'
        }
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
    
    def test_create_post_as_regular_user_forbidden(self):
        """Test que les utilisateurs normaux ne peuvent pas créer de posts"""
        self.client.force_authenticate(user=self.regular_user)
        data = {
            'title': 'Forbidden Post',
            'content': 'Should not work'
        }
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
```

### Linting et formatage

#### ESLint configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prefer-const': 'error',
  }
};
```

#### Prettier configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🚀 Déploiement et production

### Variables d'environnement

#### Backend (.env)
```bash
DEBUG=False
SECRET_KEY=your-super-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=mysql://user:pass@localhost/mabutu
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

#### Frontend (.env.production)
```bash
REACT_APP_API_URL=https://api.yourdomain.com
GENERATE_SOURCEMAP=false
```

### Build de production

#### Frontend
```bash
npm run build
# Génère le dossier build/ avec les fichiers optimisés
```

#### Backend
```bash
# Collecte des fichiers statiques
python manage.py collectstatic --noinput

# Migration en production
python manage.py migrate --run-syncdb
```

## 📊 Monitoring et logs

### Logging Django
```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'mabutu': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

### Métriques de performance
```python
# middleware personnalisé pour les métriques
import time
import logging

logger = logging.getLogger(__name__)

class PerformanceMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time
        
        logger.info(f"{request.method} {request.path} - {response.status_code} - {duration:.2f}s")
        return response
```

---

## 📚 Documents connexes

- [Architecture technique](../guides/architecture.md)
- [Documentation API](../api/README.md)
- [Guide de contribution](./contributing.md)
- [Tests et qualité](./testing.md)

---

*Documentation développeur - Projet Mabutu DEV Learn IT B3*