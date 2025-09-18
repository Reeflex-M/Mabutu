# Mabutu - Application de Blog

<div align="center">

![Mabutu Logo](https://img.shields.io/badge/Mabutu-Blog%20App-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.1.0-61DAFB?style=flat-square&logo=react)
![Django](https://img.shields.io/badge/Django-5.0.1-092E20?style=flat-square&logo=django)
![TypeScript](https://img.shields.io/badge/TypeScript-4.4.2-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)

**Application de blog moderne développée dans le cadre du projet DEV Learn IT B3**

[🚀 Démarrage rapide](./docs/guides/quickstart.md) • [📖 Documentation](./docs/README.md) • [🔧 Installation](./docs/guides/installation.md) • [👥 Manuel utilisateur](./docs/guides/user-manual.md)

</div>

---

## 🎯 Présentation du projet

Mabutu est une application de blog complète qui combine un frontend React moderne avec un backend Django robuste. Elle offre une expérience utilisateur interactive avec un système de commentaires et de réactions emoji.

### ✨ Fonctionnalités principales

- 🔐 **Authentification JWT** - Inscription, connexion et gestion des profils
- 📝 **Gestion des posts** - Création et publication par les administrateurs
- 💬 **Système de commentaires** - Interaction pour les utilisateurs connectés
- 😄 **Réactions emoji** - 5 types de réactions avec compteurs
- 📱 **Interface responsive** - Design adaptatif avec Tailwind CSS
- 🛡️ **Permissions granulaires** - Rôles utilisateur et administrateur

### 🏗️ Architecture technique

```
┌─────────────────┐    REST API     ┌─────────────────┐
│   Frontend      │ ◄──────────────► │    Backend      │
│   React 18 + TS │   JSON + JWT    │   Django 5.0    │
│   Tailwind CSS  │                 │   Django REST   │
│   Port: 3000    │                 │   Port: 8000    │
└─────────────────┘                 └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   Database      │
                                    │ SQLite / MySQL  │
                                    └─────────────────┘
```

## 🚀 Démarrage rapide

### Option 1 : Script automatique (Windows)
```batch
# Depuis la racine du projet
launch.bat
# Choisir l'option 1 pour lancer l'application complète
```

### Option 2 : Installation manuelle

#### Prérequis
- Node.js 16+ 
- Python 3.8+
- Git

#### Backend Django
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend React
```bash
cd frontend
npm install
npm run dev
```

### URLs d'accès
- **Application** : http://localhost:3000
- **API Backend** : http://localhost:8000/api/
- **Admin Django** : http://localhost:8000/admin/

## 📁 Structure du projet

```
Mabutu/
├── 📁 backend/                 # Application Django
│   ├── 📁 main/               # Configuration Django
│   ├── 📁 mabutu/             # App principale (models, views, etc.)
│   ├── manage.py              # Utilitaire Django
│   └── requirements.txt       # Dépendances Python
│
├── 📁 frontend/               # Application React
│   ├── 📁 src/
│   │   ├── 📁 components/     # Composants React
│   │   ├── 📁 services/       # Services API et auth
│   │   └── App.tsx            # Composant racine
│   ├── package.json           # Dépendances Node.js
│   └── tailwind.config.js     # Configuration Tailwind
│
├── 📁 docs/                   # Documentation complète
│   ├── 📁 guides/             # Guides utilisateur
│   ├── 📁 api/                # Documentation API
│   ├── 📁 developer/          # Docs développeur
│   └── README.md              # Index documentation
│
├── launch.bat                 # Script de lancement Windows
└── README.md                  # Ce fichier
```

## 👥 Types d'utilisateurs

| Rôle | Permissions |
|------|-------------|
| **Visiteur** | Lecture des posts et commentaires, visualisation des réactions |
| **Utilisateur** | + Commentaires, réactions emoji, gestion du profil |
| **Administrateur** | + Création/édition de posts, modération, admin Django |

## 🛠️ Technologies utilisées

### Frontend
- **React 18** avec TypeScript pour l'interface utilisateur
- **Tailwind CSS** pour le design et la responsivité
- **React Router** pour la navigation
- **Axios** pour les requêtes HTTP

### Backend  
- **Django 5.0** comme framework web
- **Django REST Framework** pour l'API
- **SimpleJWT** pour l'authentification
- **SQLite/MySQL** pour la persistance

## 📖 Documentation complète

La documentation complète est disponible dans le dossier `docs/` :

### 🎯 Pour commencer
- [🚀 Guide de démarrage rapide](./docs/guides/quickstart.md)
- [🔧 Installation détaillée](./docs/guides/installation.md)
- [📋 Vue d'ensemble du projet](./docs/guides/overview.md)

### 👥 Guides utilisateur
- [📱 Manuel utilisateur](./docs/guides/user-manual.md)
- [⚙️ Guide administrateur](./docs/guides/admin-guide.md)
- [❓ FAQ](./docs/guides/faq.md)

### 🔧 Documentation technique
- [🏗️ Architecture](./docs/guides/architecture.md)
- [🔌 API Documentation](./docs/api/README.md)
- [💻 Guide développeur](./docs/developer/README.md)

## 🎓 Contexte académique

### Projet DEV Learn IT B3
- **Objectif** : Développement d'une application web complète
- **Technologies imposées** : React + Django + Base de données + Documentation
- **Livrables** : Code source + Documentation + Présentation
- **Échéance** : Documentation livrée avant le 6 mai 2025
- **Soutenance** : 13 mai 2025 (20 minutes en équipe)

### Compétences développées
- Développement fullstack (Frontend/Backend)
- Architecture REST API
- Authentification moderne (JWT)
- Interface utilisateur responsive
- Gestion de base de données
- Documentation technique
- Gestion de projet Git

## 🤝 Contribution

Le projet est open source et les contributions sont bienvenues !

1. Fork le repository
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

Consultez le [Guide de contribution](./docs/developer/contributing.md) pour plus de détails.

## 📝 Licence

Ce projet est développé dans un cadre éducatif pour le cours DEV Learn IT B3.

## 📞 Support

- **Documentation** : [docs/README.md](./docs/README.md)
- **FAQ** : [docs/guides/faq.md](./docs/guides/faq.md)
- **Dépannage** : [docs/guides/troubleshooting.md](./docs/guides/troubleshooting.md)

---

<div align="center">

**Mabutu** - Projet DEV Learn IT B3  
*Application de blog moderne avec React et Django*

[📖 Documentation](./docs/README.md) • [🚀 Démarrer](./docs/guides/quickstart.md) • [🔧 Installer](./docs/guides/installation.md)

</div>