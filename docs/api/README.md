# Documentation API - Mabutu

## 🎯 Vue d'ensemble de l'API

L'API Mabutu est une API REST construite avec Django REST Framework qui fournit tous les endpoints nécessaires pour l'application de blog.

### Informations générales
- **Base URL** : `http://localhost:8000/api/`
- **Format** : JSON
- **Authentification** : JWT (JSON Web Tokens)
- **Versioning** : API v1 (pas de versioning dans les URLs)

### Authentification
La plupart des endpoints nécessitent une authentification via JWT. Le token doit être inclus dans l'header de chaque requête :

```http
Authorization: Bearer <votre_jwt_token>
```

## 🔐 Endpoints d'authentification

### POST /api/auth/token/
Obtenir un token JWT avec les identifiants utilisateur.

**Headers :**
```http
Content-Type: application/json
```

**Body :**
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Réponse (200 OK) :**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Erreurs :**
```json
// 401 Unauthorized
{
  "detail": "No active account found with the given credentials"
}
```

### POST /api/auth/token/refresh/
Rafraîchir un token JWT expiré.

**Body :**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Réponse (200 OK) :**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### POST /api/auth/register/
Inscription d'un nouvel utilisateur.

**Body :**
```json
{
  "username": "nouveau_utilisateur",
  "email": "email@example.com",
  "password": "mot_de_passe_securise"
}
```

**Réponse (201 Created) :**
```json
{
  "message": "Inscription réussie",
  "user": {
    "id": 1,
    "username": "nouveau_utilisateur",
    "email": "email@example.com"
  }
}
```

### GET /api/auth/user/
Obtenir les informations de l'utilisateur connecté.

**Headers :**
```http
Authorization: Bearer <jwt_token>
```

**Réponse (200 OK) :**
```json
{
  "id": 1,
  "username": "utilisateur",
  "email": "user@example.com",
  "is_staff": false
}
```

## 📝 Endpoints Posts

### GET /api/posts/
Récupérer la liste de tous les posts.

**Paramètres de requête :**
- `page` (optionnel) : Numéro de page pour la pagination
- `page_size` (optionnel) : Nombre d'éléments par page (défaut: 10)

**Réponse (200 OK) :**
```json
{
  "count": 25,
  "next": "http://localhost:8000/api/posts/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Premier post de blog",
      "content": "Contenu complet du post...",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "author": 1,
      "author_username": "admin"
    },
    {
      "id": 2,
      "title": "Deuxième post",
      "content": "Autre contenu...",
      "created_at": "2024-01-14T15:45:00Z",
      "updated_at": "2024-01-14T15:45:00Z",
      "author": 1,
      "author_username": "admin"
    }
  ]
}
```

### GET /api/posts/{id}/
Récupérer un post spécifique par son ID.

**Réponse (200 OK) :**
```json
{
  "id": 1,
  "title": "Premier post de blog",
  "content": "Contenu complet du post avec tous les détails...",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "author": 1,
  "author_username": "admin"
}
```

**Erreurs :**
```json
// 404 Not Found
{
  "detail": "Not found."
}
```

### POST /api/posts/
Créer un nouveau post (administrateurs uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "title": "Nouveau post",
  "content": "Contenu du nouveau post..."
}
```

**Réponse (201 Created) :**
```json
{
  "id": 3,
  "title": "Nouveau post",
  "content": "Contenu du nouveau post...",
  "created_at": "2024-01-16T09:15:00Z",
  "updated_at": "2024-01-16T09:15:00Z",
  "author": 1,
  "author_username": "admin"
}
```

**Erreurs :**
```json
// 403 Forbidden (utilisateur non admin)
{
  "detail": "You do not have permission to perform this action."
}

// 400 Bad Request (données invalides)
{
  "title": ["This field is required."],
  "content": ["This field is required."]
}
```

### PUT /api/posts/{id}/
Mettre à jour un post existant (administrateurs uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "title": "Titre modifié",
  "content": "Contenu modifié..."
}
```

**Réponse (200 OK) :**
```json
{
  "id": 1,
  "title": "Titre modifié",
  "content": "Contenu modifié...",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:20:00Z",
  "author": 1,
  "author_username": "admin"
}
```

### DELETE /api/posts/{id}/
Supprimer un post (administrateurs uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
```

**Réponse (204 No Content) :**
Pas de contenu, suppression réussie.

## 💬 Endpoints Commentaires

### GET /api/posts/{post_id}/comments/
Récupérer les commentaires d'un post spécifique.

**Paramètres de requête :**
- `page` (optionnel) : Numéro de page
- `page_size` (optionnel) : Nombre de commentaires par page (défaut: 5)

**Réponse (200 OK) :**
```json
{
  "count": 12,
  "next": "http://localhost:8000/api/posts/1/comments/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "content": "Excellent post ! Très informatif.",
      "created_at": "2024-01-15T11:30:00Z",
      "post": 1,
      "user": 2,
      "user_username": "lecteur1"
    },
    {
      "id": 2,
      "content": "Merci pour ce partage.",
      "created_at": "2024-01-15T12:15:00Z",
      "post": 1,
      "user": 3,
      "user_username": "lecteur2"
    }
  ]
}
```

### POST /api/posts/{post_id}/comments/
Ajouter un commentaire à un post (utilisateurs connectés uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "content": "Mon commentaire sur ce post..."
}
```

**Réponse (201 Created) :**
```json
{
  "id": 3,
  "content": "Mon commentaire sur ce post...",
  "created_at": "2024-01-16T10:00:00Z",
  "post": 1,
  "user": 2,
  "user_username": "utilisateur_connecte"
}
```

**Erreurs :**
```json
// 401 Unauthorized (utilisateur non connecté)
{
  "detail": "Authentication credentials were not provided."
}

// 400 Bad Request (contenu vide)
{
  "content": ["This field is required."]
}
```

## 😄 Endpoints Réactions Emoji

### GET /api/posts/{post_id}/reactions/
Récupérer les réactions d'un post avec compteurs.

**Réponse (200 OK) :**
```json
{
  "post_id": 1,
  "reactions": {
    "👍": {
      "count": 15,
      "user_reacted": true
    },
    "❤️": {
      "count": 8,
      "user_reacted": false
    },
    "😂": {
      "count": 3,
      "user_reacted": false
    },
    "😮": {
      "count": 1,
      "user_reacted": false
    },
    "😢": {
      "count": 0,
      "user_reacted": false
    }
  },
  "total_reactions": 27
}
```

### POST /api/posts/{post_id}/reactions/
Ajouter ou retirer une réaction emoji (utilisateurs connectés uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "emoji": "👍"
}
```

**Réponse (200 OK) :**
```json
{
  "message": "Réaction ajoutée",
  "emoji": "👍",
  "action": "added"  // ou "removed" si la réaction existait déjà
}
```

**Erreurs :**
```json
// 400 Bad Request (emoji invalide)
{
  "emoji": ["Select a valid choice. 🙂 is not one of the available choices."]
}
```

## 👥 Endpoints Utilisateurs

### GET /api/users/{id}/
Récupérer le profil public d'un utilisateur.

**Réponse (200 OK) :**
```json
{
  "id": 2,
  "username": "utilisateur",
  "date_joined": "2024-01-10T08:00:00Z",
  "posts_count": 0,
  "comments_count": 5,
  "is_staff": false
}
```

### PUT /api/users/{id}/
Mettre à jour son propre profil (utilisateur connecté uniquement).

**Headers :**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Body :**
```json
{
  "email": "nouvel_email@example.com"
}
```

**Réponse (200 OK) :**
```json
{
  "id": 2,
  "username": "utilisateur",
  "email": "nouvel_email@example.com",
  "is_staff": false
}
```

## 📊 Codes de statut HTTP

### Codes de succès
- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **204 No Content** : Requête réussie sans contenu de retour

### Codes d'erreur client
- **400 Bad Request** : Données de requête invalides
- **401 Unauthorized** : Authentification requise ou token invalide
- **403 Forbidden** : Permissions insuffisantes
- **404 Not Found** : Ressource non trouvée
- **405 Method Not Allowed** : Méthode HTTP non autorisée

### Codes d'erreur serveur
- **500 Internal Server Error** : Erreur interne du serveur

## 🔧 Exemples d'utilisation

### Workflow complet d'authentification
```javascript
// 1. Inscription
const registerResponse = await fetch('/api/auth/register/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'nouvel_utilisateur',
    email: 'email@example.com',
    password: 'motdepasse123'
  })
});

// 2. Connexion
const loginResponse = await fetch('/api/auth/token/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'nouvel_utilisateur',
    password: 'motdepasse123'
  })
});

const { access, refresh } = await loginResponse.json();

// 3. Utilisation du token pour les requêtes authentifiées
const postsResponse = await fetch('/api/posts/', {
  headers: {
    'Authorization': `Bearer ${access}`
  }
});
```

### Création d'un post (admin)
```javascript
const createPost = async (title, content, token) => {
  const response = await fetch('/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title,
      content: content
    })
  });
  
  return await response.json();
};
```

### Ajout d'un commentaire
```javascript
const addComment = async (postId, content, token) => {
  const response = await fetch(`/api/posts/${postId}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      content: content
    })
  });
  
  return await response.json();
};
```

## 🐛 Gestion des erreurs

### Format des erreurs
Toutes les erreurs suivent un format JSON cohérent :

```json
{
  "field_name": ["Message d'erreur spécifique"],
  "another_field": ["Autre message d'erreur"]
}
```

Ou pour les erreurs générales :
```json
{
  "detail": "Message d'erreur général"
}
```

### Exemples d'erreurs courantes

#### Token expiré (401)
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

#### Permissions insuffisantes (403)
```json
{
  "detail": "You do not have permission to perform this action."
}
```

#### Validation des données (400)
```json
{
  "title": ["This field is required."],
  "content": ["Ensure this field has at least 10 characters."]
}
```

---

## 📚 Documents connexes

- [Authentification](./authentication.md)
- [Endpoints Posts](./posts.md)
- [Endpoints Commentaires](./comments.md)
- [Endpoints Utilisateurs](./users.md)
- [Architecture technique](../guides/architecture.md)

---

*Documentation API - Projet Mabutu DEV Learn IT B3*