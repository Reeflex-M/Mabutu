# Spécifications fonctionnelles - Mabutu

## 📋 Cahier des charges

### Contexte du projet
- **Projet :** DEV Learn IT B3
- **Type :** Application de blog
- **Technologies imposées :** React + Django + Base de données + Documentation
- **Date limite :** Documentation livrée 1 semaine avant la soutenance (6 mai 2025)
- **Soutenance :** 13 mai 2025 (20 minutes en équipe)

## 🎯 Objectifs fonctionnels

### Objectif principal
Développer une application de blog complète permettant la publication de posts, la gestion des commentaires et un système de réactions emoji.

### Objectifs secondaires
- Implémenter un système d'authentification robuste
- Créer une interface utilisateur moderne et responsive
- Assurer la sécurité des données et des accès
- Fournir une documentation technique complète

## 👥 Acteurs du système

### 1. Visiteur anonyme
**Rôle :** Consultation du contenu public
- Peut consulter la liste des posts
- Peut lire les posts complets
- Peut voir les commentaires existants
- Peut voir les compteurs de réactions emoji
- Ne peut pas interagir (commenter ou réagir)

### 2. Utilisateur enregistré
**Rôle :** Participation active à la communauté
- Hérite de toutes les capacités du visiteur
- Peut s'inscrire et se connecter
- Peut commenter les posts
- Peut réagir avec des emojis
- Peut gérer son profil

### 3. Administrateur
**Rôle :** Gestion complète de la plateforme
- Hérite de toutes les capacités de l'utilisateur
- Peut créer et publier des posts
- Peut éditer et supprimer des posts
- Peut modérer les commentaires
- Accès à l'interface d'administration

## 📝 Fonctionnalités détaillées

### F1 - Authentification
**Priorité :** Critique

#### F1.1 - Inscription
- Formulaire avec : nom d'utilisateur, email, mot de passe, confirmation
- Validation côté client et serveur
- Vérification de l'unicité du nom d'utilisateur
- Hashage sécurisé du mot de passe
- Création automatique du profil utilisateur

#### F1.2 - Connexion
- Formulaire avec nom d'utilisateur et mot de passe
- Génération d'un token JWT
- Redirection vers le tableau de bord
- Gestion des erreurs d'authentification

#### F1.3 - Déconnexion
- Invalidation du token côté client
- Redirection vers la page d'accueil
- Nettoyage des données de session

#### F1.4 - Gestion de profil
- Affichage des informations utilisateur
- Modification des données personnelles
- Historique des activités (optionnel)

### F2 - Gestion des posts
**Priorité :** Critique

#### F2.1 - Affichage public des posts
- Liste des posts par ordre chronologique (plus récents en premier)
- Prévisualisation limitée à 5 lignes de texte
- Affichage du titre, auteur, date de publication
- Bouton "Lire plus" pour l'affichage complet

#### F2.2 - Vue détaillée d'un post
- Affichage complet du contenu
- Implémentation au choix : modal ou nouvel onglet
- Affichage de tous les commentaires (sans pagination)
- Interface de réaction et commentaire

#### F2.3 - Création de posts (Admin uniquement)
- Formulaire avec titre et contenu
- Éditeur de texte enrichi (optionnel)
- Prévisualisation avant publication
- Attribution automatique de l'auteur connecté

#### F2.4 - Édition de posts (Admin uniquement)
- Modification du titre et contenu
- Sauvegarde avec mise à jour de la date de modification
- Historique des versions (optionnel)

#### F2.5 - Protection des routes
- Page de création accessible uniquement aux administrateurs
- Redirection automatique en cas d'accès non autorisé
- Vérification des permissions côté serveur

### F3 - Système de commentaires
**Priorité :** Importante

#### F3.1 - Affichage des commentaires
- Maximum 5 commentaires affichés par défaut sur la liste des posts
- Pagination si plus de 5 commentaires
- Affichage complet dans la vue détaillée du post
- Ordre chronologique (plus récents en premier ou en dernier)

#### F3.2 - Création de commentaires
- Formulaire simple avec zone de texte
- Réservé aux utilisateurs connectés
- Attribution automatique de l'auteur
- Validation du contenu (longueur minimale/maximale)

#### F3.3 - Modération (Admin)
- Possibilité de supprimer les commentaires inappropriés
- Signalement des commentaires par les utilisateurs (optionnel)

### F4 - Système de réactions emoji
**Priorité :** Importante

#### F4.1 - Types de réactions
Cinq types d'emoji disponibles :
- 👍 Pouce en haut (j'aime)
- ❤️ Cœur (j'adore)
- 😂 Rire (drôle)
- 😮 Surprise (surprenant)
- 😢 Triste (émouvant)

#### F4.2 - Fonctionnement des réactions
- Un utilisateur peut mettre une réaction par type d'emoji
- Cliquer à nouveau sur un emoji retire la réaction
- Compteur public visible par tous (connectés ou non)
- Réactions réservées aux utilisateurs connectés

#### F4.3 - Affichage des compteurs
- Compteur visible à côté de chaque emoji
- Mise à jour en temps réel
- Indication visuelle des réactions de l'utilisateur connecté

### F5 - Interface utilisateur
**Priorité :** Importante

#### F5.1 - Design responsive
- Adaptation automatique aux différentes tailles d'écran
- Mobile-first approach
- Navigation intuitive sur tous les appareils

#### F5.2 - Navigation
- Menu principal avec liens vers les sections importantes
- Barre de navigation avec état de connexion
- Fil d'Ariane pour la navigation (optionnel)

#### F5.3 - Composants UI
- Design cohérent avec Tailwind CSS
- Composants réutilisables
- Animations et transitions fluides
- Messages de feedback utilisateur

## 🔒 Contraintes techniques

### Sécurité
- **Authentification :** JWT avec expiration
- **Autorisation :** Vérification des permissions à chaque requête
- **Validation :** Validation des données côté client ET serveur
- **Injection SQL :** Protection via l'ORM Django
- **XSS :** Échappement automatique des données affichées

### Performance
- **Pagination :** Limitation du nombre d'éléments par page
- **Cache :** Mise en cache des données statiques (optionnel)
- **Optimisation :** Requêtes base de données optimisées
- **Images :** Compression et redimensionnement automatiques (optionnel)

### Compatibilité
- **Navigateurs :** Support des navigateurs modernes (Chrome, Firefox, Safari, Edge)
- **Responsive :** Compatibilité mobile et tablette
- **Accessibilité :** Respect des standards WCAG de base

## 📊 Critères d'acceptation

### Critères techniques
- [ ] Application fonctionnelle avec toutes les fonctionnalités spécifiées
- [ ] Interface responsive sur mobile et desktop
- [ ] Authentification et autorisation sécurisées
- [ ] Tests unitaires pour les fonctions critiques
- [ ] Documentation technique complète

### Critères fonctionnels
- [ ] Inscription et connexion utilisateur
- [ ] Affichage des posts avec prévisualisation
- [ ] Système de commentaires fonctionnel
- [ ] Réactions emoji avec compteurs
- [ ] Interface d'administration pour les posts
- [ ] Protection des routes selon les rôles

### Critères de qualité
- [ ] Code propre et bien structuré
- [ ] Respect des bonnes pratiques
- [ ] Documentation à jour et complète
- [ ] Interface utilisateur intuitive
- [ ] Performance acceptable (< 2s de chargement)

## 🚀 Livrables

### Documentation obligatoire
- [ ] Documentation technique complète
- [ ] Guide d'installation et de déploiement
- [ ] Manuel utilisateur
- [ ] Documentation API
- [ ] Code source sur GitHub avec README

### Présentation
- [ ] Démonstration fonctionnelle (13 mai 2025)
- [ ] Présentation technique (20 minutes)
- [ ] Partage équitable du temps de parole
- [ ] Explication de chaque fonctionnalité

---

## 📚 Documents connexes

- [Vue d'ensemble du projet](./overview.md)
- [Architecture technique](./architecture.md)
- [Guide d'installation](./installation.md)
- [Documentation API](../api/README.md)

---

*Spécifications fonctionnelles - Projet Mabutu DEV Learn IT B3*