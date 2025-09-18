# Vue d'ensemble du projet Mabutu

## 🎯 Présentation générale

Mabutu est une application de blog moderne développée dans le cadre du projet DEV Learn IT B3. L'application combine un frontend React avec un backend Django pour offrir une expérience de blog complète et interactive.

## 🏗️ Architecture générale

L'application suit une architecture séparée frontend/backend :

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   Frontend      │◄────────────────────►│    Backend      │
│   React + TS    │      JSON/JWT       │   Django REST   │
│   Tailwind CSS  │                     │   SQLite/MySQL  │
└─────────────────┘                     └─────────────────┘
```

### Frontend (React + TypeScript)
- **Framework :** React 18 avec TypeScript
- **Styling :** Tailwind CSS pour un design moderne
- **Routage :** React Router pour la navigation
- **État :** Context API pour la gestion globale
- **HTTP :** Axios pour les requêtes API

### Backend (Django REST)
- **Framework :** Django 5.0 avec Django REST Framework
- **Authentification :** JWT (JSON Web Tokens)
- **Base de données :** SQLite (dev) / MySQL (production)
- **Permissions :** Système de rôles (User/Admin)

## 🎨 Design et expérience utilisateur

### Principes de design
- **Simplicité :** Interface claire et intuitive
- **Responsivité :** Adaptable à tous les écrans
- **Accessibilité :** Navigation facilitée
- **Performance :** Chargement rapide et fluide

### Thématique visuelle
- **Palette de couleurs :** Moderne avec nuances de gris et bleu
- **Typography :** Police claire et lisible
- **Composants :** Design système cohérent
- **Animations :** Transitions fluides

## 👥 Types d'utilisateurs

### 1. Visiteur anonyme
- ✅ Consultation des posts
- ✅ Lecture des commentaires
- ✅ Vue des réactions emoji (compteurs)
- ❌ Aucune interaction (pas de commentaires/réactions)

### 2. Utilisateur connecté
- ✅ Toutes les fonctionnalités visiteur
- ✅ Ajout de commentaires
- ✅ Réactions emoji sur les posts
- ✅ Gestion de son profil
- ❌ Création de posts (réservée aux admins)

### 3. Administrateur
- ✅ Toutes les fonctionnalités utilisateur
- ✅ Création et édition de posts
- ✅ Gestion des utilisateurs
- ✅ Modération des commentaires

## 🔄 Flux utilisateur principal

### Parcours visiteur
1. **Accueil** → Liste des posts avec prévisualisation
2. **Lecture** → Clic sur "Lire plus" pour voir le post complet
3. **Découverte** → Navigation entre les posts
4. **Inscription** → Création de compte pour interagir

### Parcours utilisateur connecté
1. **Connexion** → Authentification sur la plateforme
2. **Interaction** → Commentaires et réactions sur les posts
3. **Profil** → Gestion des informations personnelles
4. **Participation** → Engagement continu avec la communauté

### Parcours administrateur
1. **Administration** → Accès aux outils de gestion
2. **Création** → Rédaction et publication de nouveaux posts
3. **Modération** → Surveillance et gestion du contenu
4. **Analytiques** → Suivi de l'activité de la plateforme

## 📱 Fonctionnalités principales

### Gestion des posts
- **Affichage public** avec prévisualisation (5 lignes max)
- **Vue complète** en modal ou nouvel onglet
- **Création/édition** réservée aux administrateurs
- **Organisation** par date de publication

### Système de commentaires
- **Commentaires authentifiés** uniquement
- **Pagination** (5 commentaires par défaut)
- **Affichage complet** dans la vue détaillée du post
- **Modération** par les administrateurs

### Réactions emoji
- **5 types de réactions** : 👍 ❤️ 😂 😮 😢
- **Compteurs publics** de chaque réaction
- **Une réaction par emoji et par utilisateur**
- **Toggle** : re-cliquer retire la réaction

### Authentification et sécurité
- **JWT tokens** pour l'authentification
- **Permissions granulaires** par type d'utilisateur
- **Protection des routes** frontend et backend
- **Validation des données** côté serveur

## 🎯 Objectifs pédagogiques

### Compétences techniques développées
- **Développement fullstack** avec séparation des responsabilités
- **API REST** et communication client-serveur
- **Authentification moderne** avec JWT
- **Interface utilisateur responsive** avec React
- **Gestion de base de données** avec Django ORM

### Méthodologie projet
- **Gestion de version** avec Git
- **Documentation technique** complète
- **Tests** et validation du code
- **Déploiement** et mise en production
- **Présentation** et soutenance d'équipe

---

## 📚 Documents connexes

- [Spécifications fonctionnelles](./specifications.md)
- [Architecture technique](./architecture.md)
- [Guide d'installation](./installation.md)
- [Manuel utilisateur](./user-manual.md)

---

*Vue d'ensemble - Projet Mabutu DEV Learn IT B3*