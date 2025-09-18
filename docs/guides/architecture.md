# Architecture technique - Mabutu

## 🏗️ Vue d'ensemble de l'architecture

Mabutu suit une architecture moderne en **deux tiers séparés** (frontend/backend) qui communiquent via une API REST.

```
┌──────────────────────────────────────────────────────────────┐
│                     ARCHITECTURE MABUTU                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐    HTTP/REST     ┌─────────────────┐     │
│  │   FRONTEND      │ ◄──────────────► │    BACKEND      │     │
│  │                 │   JSON + JWT     │                 │     │
│  │  React 18 + TS  │                  │  Django 5.0     │     │
│  │  Tailwind CSS   │                  │  Django REST    │     │
│  │  React Router   │                  │  Framework      │     │
│  │  Axios          │                  │                 │     │
│  │                 │                  │                 │     │
│  │  Port: 3000     │                  │  Port: 8000     │     │
│  └─────────────────┘                  └─────────────────┘     │
│                                                ▲              │
│                                                │              │
│                                                ▼              │
│                                       ┌─────────────────┐     │
│                                       │   BASE DE       │     │
│                                       │   DONNÉES       │     │
│                                       │                 │     │
│                                       │  SQLite (dev)   │     │
│                                       │  MySQL (prod)   │     │
│                                       └─────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

## 🔧 Technologies et frameworks

### Frontend - React Ecosystem

#### Core Framework
- **React 18.1.0** : Framework JavaScript pour interfaces utilisateur
- **TypeScript 4.4.2** : Typage statique pour JavaScript
- **React Router DOM 7.4.0** : Gestion du routage côté client

#### Styling et UI
- **Tailwind CSS 3.4.1** : Framework CSS utility-first
- **PostCSS 8.4.33** : Outil de transformation CSS
- **Autoprefixer 10.4.17** : Ajout automatique des préfixes CSS

#### HTTP et State Management
- **Axios 1.8.4** : Client HTTP pour les requêtes API
- **Context API** : Gestion d'état global React native

#### Development Tools
- **React Scripts 5.0.1** : Outils de build et développement
- **ESLint** : Linter JavaScript/TypeScript
- **Prettier** : Formatage automatique du code

### Backend - Django Ecosystem

#### Core Framework
- **Django 5.0.1** : Framework web Python
- **Django REST Framework 3.14.0** : Extension pour APIs REST
- **Python 3.8+** : Langage de programmation

#### Authentication & Security
- **Django REST Framework SimpleJWT 5.3.0** : Authentification JWT
- **Django CORS Headers 4.3.1** : Gestion des CORS
- **Django Auth** : Système d'authentification intégré

#### Database
- **SQLite** : Base de données par défaut (développement)
- **MySQL** : Base de données de production (avec psycopg2-binary)
- **Django ORM** : Mapping objet-relationnel

#### Configuration
- **Python Decouple 3.8** : Gestion des variables d'environnement

## 📁 Structure détaillée du projet

```
Mabutu/
├── 📁 frontend/                    # Application React
│   ├── 📁 public/                  # Fichiers statiques publics
│   │   ├── index.html              # Template HTML principal
│   │   ├── favicon.ico             # Icône du site
│   │   └── manifest.json           # Manifest PWA
│   │
│   ├── 📁 src/                     # Code source React
│   │   ├── 📁 components/          # Composants React
│   │   │   ├── Login.js            # Composant de connexion
│   │   │   ├── Register.js         # Composant d'inscription
│   │   │   ├── Profile.js          # Composant profil utilisateur
│   │   │   ├── PostList.js         # Liste des posts
│   │   │   ├── PostDetail.js       # Détail d'un post
│   │   │   ├── CreatePost.js       # Création de post (admin)
│   │   │   └── PrivateRoute.js     # Route protégée
│   │   │
│   │   ├── 📁 services/            # Services et utilitaires
│   │   │   ├── auth.service.js     # Service d'authentification
│   │   │   ├── api.service.js      # Service API
│   │   │   └── auth-header.js      # Headers d'authentification
│   │   │
│   │   ├── 📁 context/             # Contextes React
│   │   │   └── AuthContext.js      # Contexte d'authentification
│   │   │
│   │   ├── App.tsx                 # Composant racine
│   │   ├── index.tsx               # Point d'entrée React
│   │   ├── App.css                 # Styles globaux
│   │   └── index.css               # Styles Tailwind
│   │
│   ├── package.json                # Dépendances et scripts npm
│   ├── tsconfig.json              # Configuration TypeScript
│   ├── tailwind.config.js         # Configuration Tailwind
│   └── postcss.config.js          # Configuration PostCSS
│
├── 📁 backend/                     # Application Django
│   ├── 📁 main/                    # Projet Django principal
│   │   ├── __init__.py
│   │   ├── settings.py             # Configuration Django
│   │   ├── urls.py                 # URLs principales
│   │   ├── wsgi.py                 # Interface WSGI
│   │   └── asgi.py                 # Interface ASGI
│   │
│   ├── 📁 mabutu/                  # Application Django principale
│   │   ├── 📁 migrations/          # Migrations de base de données
│   │   ├── __init__.py
│   │   ├── admin.py                # Interface d'administration
│   │   ├── apps.py                 # Configuration de l'app
│   │   ├── models.py               # Modèles de données
│   │   ├── serializers.py          # Sérialiseurs API
│   │   ├── views.py                # Vues API
│   │   ├── urls.py                 # URLs de l'application
│   │   └── tests.py                # Tests unitaires
│   │
│   ├── manage.py                   # Utilitaire de gestion Django
│   ├── requirements.txt            # Dépendances Python
│   └── db.sqlite3                  # Base de données SQLite
│
├── 📁 docs/                        # Documentation
│   ├── 📁 guides/                  # Guides utilisateur
│   ├── 📁 api/                     # Documentation API
│   ├── 📁 developer/               # Documentation développeur
│   └── README.md                   # Index de la documentation
│
├── launch.bat                      # Script de lancement Windows
├── .gitignore                      # Fichiers ignorés par Git
└── README.md                       # Documentation principale
```

## 🔄 Flux de données et communication

### Architecture de communication

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   FRONTEND      │         │    BACKEND      │         │   DATABASE      │
│   (React)       │         │   (Django)      │         │ (SQLite/MySQL)  │
│                 │         │                 │         │                 │
│  User Action    │ ──HTTP──→ │  API Endpoint   │ ──ORM──→ │     Tables      │
│     ▲           │ ←─JSON──  │       ▲         │ ←─Data─  │        ▲        │
│     │           │         │       │         │         │        │        │
│  State Update   │         │  Business Logic │         │    Queries      │
│     ▲           │         │       ▲         │         │        ▲        │
│     │           │         │  Authentication │         │   Relationships │
│ Component       │         │   Permissions   │         │    Constraints  │
│  Rendering      │         │   Validation    │         │     Indexes     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Flux d'authentification JWT

```
1. LOGIN REQUEST
   Frontend ──POST /api/auth/login──→ Backend
           ←─{access_token, refresh_token}─┘

2. AUTHENTICATED REQUESTS
   Frontend ──GET /api/posts/ (+ JWT Header)──→ Backend
           ←────────JSON Response──────────────┘

3. TOKEN REFRESH
   Frontend ──POST /api/auth/refresh──→ Backend
           ←────New access_token─────┘

4. LOGOUT
   Frontend ──Token removal──→ Local Storage
```

## 🗃️ Modèle de données

### Diagramme relationnel

```sql
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│      User       │     │      Post       │     │    Comment      │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │────┐│ id (PK)         │────┐│ id (PK)         │
│ username        │    ││ title           │    ││ content         │
│ email           │    ││ content         │    ││ created_at      │
│ password_hash   │    ││ created_at      │    ││ post_id (FK)    │────┐
│ is_staff        │    ││ updated_at      │    ││ user_id (FK)    │───┐│
│ is_active       │    ││ author_id (FK)  │────┘└─────────────────┘   ││
│ date_joined     │    │└─────────────────┘                          ││
└─────────────────┘    │                                             ││
         ▲              │  ┌─────────────────┐                       ││
         └──────────────┘  │ EmojiReaction   │                       ││
                           ├─────────────────┤                       ││
                           │ id (PK)         │                       ││
                           │ emoji           │                       ││
                           │ created_at      │                       ││
                           │ post_id (FK)    │───────────────────────┘│
                           │ user_id (FK)    │────────────────────────┘
                           └─────────────────┘
```

### Modèles Django détaillés

#### User (Django Auth)
```python
class User(AbstractUser):
    id: AutoField(primary_key=True)
    username: CharField(max_length=150, unique=True)
    email: EmailField()
    password: CharField(max_length=128)
    is_staff: BooleanField(default=False)      # Admin privileges
    is_active: BooleanField(default=True)
    date_joined: DateTimeField(auto_now_add=True)
```

#### Post
```python
class Post(Model):
    id: AutoField(primary_key=True)
    title: CharField(max_length=200)
    content: TextField()
    created_at: DateTimeField(auto_now_add=True)
    updated_at: DateTimeField(auto_now=True)
    author: ForeignKey(User, on_delete=CASCADE)
    
    class Meta:
        ordering = ['-created_at']
```

#### Comment
```python
class Comment(Model):
    id: AutoField(primary_key=True)
    content: TextField()
    created_at: DateTimeField(auto_now_add=True)
    post: ForeignKey(Post, on_delete=CASCADE)
    user: ForeignKey(User, on_delete=CASCADE)
    
    class Meta:
        ordering = ['-created_at']
```

#### EmojiReaction
```python
class EmojiReaction(Model):
    EMOJI_CHOICES = [
        ('👍', 'Pouce en haut'),
        ('❤️', 'Cœur'),
        ('😂', 'Rire'),
        ('😮', 'Surprise'),
        ('😢', 'Triste'),
    ]
    
    id: AutoField(primary_key=True)
    emoji: CharField(max_length=5, choices=EMOJI_CHOICES)
    created_at: DateTimeField(auto_now_add=True)
    post: ForeignKey(Post, on_delete=CASCADE)
    user: ForeignKey(User, on_delete=CASCADE)
    
    class Meta:
        unique_together = ('post', 'user', 'emoji')
```

## 🔐 Sécurité et authentification

### Système JWT (JSON Web Tokens)

#### Configuration Django
```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
}
```

#### Flow d'authentification
1. **Login** : Validation credentials → Génération JWT
2. **Request** : Envoi JWT dans header Authorization
3. **Validation** : Vérification signature + expiration
4. **Response** : Données utilisateur ou erreur 401

### Permissions et autorisation

#### Système de rôles
- **Anonymous** : Lecture seule des posts et commentaires
- **User** : + Commentaires et réactions emoji
- **Admin** : + Création/édition de posts + modération

#### Implémentation Django
```python
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
```

### Protection CORS
Configuration pour autoriser les requêtes cross-origin depuis le frontend :
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
]
CORS_ALLOW_CREDENTIALS = True
```

## 🚀 Performance et optimisation

### Backend optimizations
- **Pagination** : Limite le nombre d'objets par requête
- **Select Related** : Optimisation des requêtes ORM
- **Indexing** : Index sur les champs de recherche fréquents
- **Caching** : Cache des templates et requêtes (optionnel)

### Frontend optimizations
- **Code Splitting** : Chargement différé des composants
- **Memoization** : React.memo pour éviter les re-renders
- **Bundle Optimization** : Webpack optimizations via Create React App

## 📊 Monitoring et logs

### Logs Django
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

---

## 📚 Documents connexes

- [Guide d'installation](./installation.md)
- [Documentation API](../api/README.md)
- [Structure du projet](../developer/project-structure.md)
- [Technologies utilisées](../developer/technologies.md)

---

*Architecture technique - Projet Mabutu DEV Learn IT B3*