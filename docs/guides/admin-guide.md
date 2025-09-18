# Guide administrateur - Mabutu

## 🔑 Présentation du rôle administrateur

En tant qu'administrateur de Mabutu, vous avez accès à des fonctionnalités avancées pour gérer le contenu et modérer la plateforme. Ce guide détaille toutes vos prérogatives et responsabilités.

## 👨‍💼 Privilèges administrateur

### Droits étendus
- ✅ **Toutes les fonctionnalités utilisateur** : Commentaires, réactions, profil
- ✅ **Création de posts** : Rédaction et publication de contenu
- ✅ **Édition de posts** : Modification du contenu existant
- ✅ **Suppression de posts** : Retrait de contenu inapproprié
- ✅ **Accès à l'interface Django Admin** : Gestion complète des données
- ✅ **Modération des commentaires** : Suppression de contenu inapproprié

### Responsabilités
- 📝 **Création de contenu de qualité**
- 🛡️ **Modération et respect des règles**
- 👥 **Gestion de la communauté**
- 🔒 **Sécurité de la plateforme**

## 📝 Gestion des posts

### Accéder à la création de posts

#### Via l'interface utilisateur
1. **Connectez-vous** avec votre compte administrateur
2. Dans la navigation, un **lien "Créer un post"** apparaît (visible uniquement pour les admins)
3. Cliquez pour accéder au formulaire de création

#### Via l'admin Django
1. Rendez-vous sur `http://localhost:8000/admin/`
2. Connectez-vous avec vos identifiants admin
3. Section **"Mabutu"** → **"Posts"**
4. Bouton **"Ajouter Post"**

### Créer un nouveau post

#### Formulaire de création
1. **Titre** : 
   - Maximum 200 caractères
   - Descriptif et accrocheur
   - Unique de préférence

2. **Contenu** :
   - Texte libre, format markdown supporté
   - Pas de limite de longueur
   - Structurez avec des paragraphes

3. **Prévisualisation** :
   - Vérifiez le rendu avant publication
   - Assurez-vous que les 5 premières lignes sont accrocheuses

4. **Publication** :
   - Cliquez sur **"Publier"**
   - Le post apparaît immédiatement sur la plateforme
   - Vous êtes automatiquement défini comme auteur

#### Bonnes pratiques pour les posts
- ✅ **Titre attractif** : Donne envie de lire
- ✅ **Introduction claire** : Les 5 premières lignes sont cruciales
- ✅ **Contenu structuré** : Utilisez des paragraphes et sous-titres
- ✅ **Longueur appropriée** : Ni trop court, ni trop long
- ✅ **Révision** : Relisez avant de publier

### Éditer un post existant

#### Via l'interface utilisateur
1. **Affichez le post** en mode détaillé
2. **Bouton "Éditer"** (visible uniquement pour les admins)
3. **Modifiez** le titre et/ou le contenu
4. **Sauvegardez** les modifications

#### Via l'admin Django
1. **Section Posts** dans l'admin
2. **Cliquez sur le post** à modifier
3. **Formulaire d'édition** complet
4. **Sauvegardez** les modifications

#### Informations de modification
- **Date de modification** automatiquement mise à jour
- **Auteur original** conservé
- **Historique** disponible dans l'admin Django

### Supprimer un post

#### Procédure
1. **Accédez à l'admin Django**
2. **Sélectionnez le post** à supprimer
3. **Action "Supprimer"** dans le menu
4. **Confirmez** la suppression

#### ⚠️ Attention
- La suppression est **définitive**
- Tous les **commentaires associés** sont également supprimés
- Toutes les **réactions** sont perdues
- **Aucune récupération possible**

## 🛡️ Modération et gestion de contenu

### Modération des commentaires

#### Via l'admin Django
1. **Section "Comments"** dans l'admin
2. **Liste de tous les commentaires**
3. **Filtres disponibles** :
   - Par post
   - Par utilisateur
   - Par date
4. **Actions de modération** :
   - Supprimer des commentaires inappropriés
   - Modifier le contenu si nécessaire

#### Critères de modération
- ❌ **Contenu offensant** ou discriminatoire
- ❌ **Spam** ou contenu répétitif
- ❌ **Hors-sujet** ou non pertinent
- ❌ **Informations fausses** ou trompeuses
- ❌ **Contenu illégal** ou dangereux

### Gestion des utilisateurs

#### Accès aux profils utilisateurs
1. **Admin Django** → **"Auth"** → **"Users"**
2. **Liste complète** des utilisateurs
3. **Informations disponibles** :
   - Nom d'utilisateur et email
   - Date d'inscription
   - Dernière connexion
   - Statut (actif/inactif)
   - Permissions

#### Actions possibles
- ✅ **Désactiver un compte** : `is_active = False`
- ✅ **Promouvoir en admin** : `is_staff = True`
- ✅ **Modifier les informations** de base
- ✅ **Réinitialiser les mots de passe**
- ❌ **Supprimer complètement** (déconseillé)

### Surveillance de l'activité

#### Métriques importantes
- **Nombre de posts** publiés
- **Nombre d'utilisateurs** actifs
- **Volume de commentaires** par période
- **Réactions** les plus populaires

#### Signalements
*Fonctionnalité future : système de signalement par les utilisateurs*

## 🔧 Interface d'administration Django

### Accès à l'admin Django
1. **URL** : `http://localhost:8000/admin/`
2. **Identifiants** : Votre compte administrateur
3. **Tableau de bord** avec toutes les sections

### Sections disponibles

#### AUTHENTICATION AND AUTHORIZATION
- **Groups** : Gestion des groupes d'utilisateurs
- **Users** : Gestion des comptes utilisateurs

#### MABUTU
- **Comments** : Gestion des commentaires
- **Posts** : Gestion des posts

### Fonctionnalités avancées

#### Filtres et recherche
- **Filtres latéraux** : Par date, auteur, statut
- **Barre de recherche** : Recherche dans le contenu
- **Tri des colonnes** : Organisation des données

#### Actions en lot
- **Sélection multiple** : Cases à cocher
- **Actions groupées** : Supprimer en masse
- **Export** : Vers CSV ou autres formats

#### Historique des modifications
- **Log des changements** : Qui a modifié quoi et quand
- **Récupération** de données dans certains cas
- **Audit trail** complet

## 📊 Tableau de bord et statistiques

### Métriques de contenu
```
📝 Posts publiés : 25
💬 Commentaires : 150
😄 Réactions : 450
👥 Utilisateurs actifs : 75
```

### Analyser l'engagement
- **Posts les plus commentés**
- **Posts avec le plus de réactions**
- **Utilisateurs les plus actifs**
- **Tendances temporelles**

### Rapports périodiques
*Recommandé : Générer des rapports hebdomadaires/mensuels*

## 🚨 Gestion des situations d'urgence

### Contenu inapproprié
1. **Suppression immédiate** du contenu
2. **Avertissement** à l'utilisateur concerné
3. **Documentation** de l'incident
4. **Suspension temporaire** si récidive

### Attaques ou spam
1. **Désactivation des comptes** problématiques
2. **Suppression en masse** du contenu spam
3. **Renforcement des mesures** de sécurité
4. **Analyse des logs** pour comprendre l'attaque

### Problèmes techniques
1. **Accès aux logs** du serveur
2. **Contact avec l'équipe** technique
3. **Communication** avec les utilisateurs
4. **Plan de continuité** de service

## 🔒 Sécurité et bonnes pratiques

### Sécurité du compte admin
- ✅ **Mot de passe fort** et unique
- ✅ **Déconnexion** après chaque session
- ✅ **Accès depuis des postes** sécurisés uniquement
- ✅ **Surveillance** des connexions suspectes

### Sauvegarde et récupération
- 📦 **Backups réguliers** de la base de données
- 💾 **Sauvegarde du code** source
- 🔄 **Procédures de restauration** testées
- 📋 **Documentation** des procédures

### Mise à jour et maintenance
- 🔄 **Mises à jour** régulières du système
- 🐛 **Surveillance** des bugs et failles
- 📊 **Monitoring** des performances
- 🛠️ **Maintenance préventive**

## 📋 Checklist de l'administrateur

### Quotidien
- [ ] **Vérifier les nouveaux commentaires**
- [ ] **Modérer le contenu** si nécessaire
- [ ] **Répondre aux signalements** utilisateurs
- [ ] **Surveiller l'activité** générale

### Hebdomadaire
- [ ] **Créer du nouveau contenu** (posts)
- [ ] **Analyser les statistiques** d'engagement
- [ ] **Nettoyer les contenus** obsolètes
- [ ] **Vérifier la sécurité** du système

### Mensuel
- [ ] **Rapport d'activité** complet
- [ ] **Sauvegarde complète** des données
- [ ] **Mise à jour** des dépendances
- [ ] **Planification** du contenu futur

## 🆘 Support et escalade

### Ressources d'aide
1. **Documentation technique** complète
2. **Logs système** pour le diagnostic
3. **Communauté** des développeurs
4. **Support technique** de l'équipe

### Procédures d'escalade
1. **Problèmes mineurs** : Résolution autonome
2. **Problèmes majeurs** : Contact équipe technique
3. **Urgences** : Escalade immédiate
4. **Communication** : Information des utilisateurs

---

## 📚 Documents connexes

- [Manuel utilisateur](./user-manual.md)
- [Documentation API](../api/README.md)
- [Architecture technique](./architecture.md)
- [Guide de dépannage](./troubleshooting.md)

---

*Guide administrateur - Projet Mabutu DEV Learn IT B3*