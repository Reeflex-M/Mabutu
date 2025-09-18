# Manuel utilisateur - Mabutu

## 🎯 Bienvenue sur Mabutu

Mabutu est une plateforme de blog interactive qui vous permet de découvrir, lire et interagir avec du contenu publié par la communauté. Ce manuel vous guide à travers toutes les fonctionnalités disponibles.

## 🚀 Premier pas sur la plateforme

### Accéder à Mabutu
1. Ouvrez votre navigateur web
2. Rendez-vous sur `http://localhost:3000` (ou l'URL fournie)
3. Vous arrivez sur la page d'accueil avec la liste des posts

### Navigation principale
La barre de navigation en haut de page vous donne accès à :
- **Mabutu** : Retour à l'accueil
- **Accueil** : Liste des posts
- **Profil** : Votre profil personnel (si connecté)
- **S'inscrire** : Créer un compte
- **Se connecter** : Accès à votre compte

## 👥 Gestion de votre compte

### Créer un compte
1. Cliquez sur **"S'inscrire"** dans la navigation
2. Remplissez le formulaire :
   - **Nom d'utilisateur** : Unique sur la plateforme
   - **Email** : Votre adresse email valide
   - **Mot de passe** : Au moins 8 caractères
   - **Confirmer le mot de passe** : Répétez le même mot de passe
3. Cliquez sur **"S'inscrire"**
4. Vous êtes automatiquement connecté et redirigé vers votre profil

### Se connecter
1. Cliquez sur **"Se connecter"** dans la navigation
2. Saisissez vos identifiants :
   - **Nom d'utilisateur**
   - **Mot de passe**
3. Cliquez sur **"Se connecter"**
4. Vous êtes redirigé vers votre profil

### Gérer votre profil
Une fois connecté, accédez à votre profil via le menu **"Profil"** :
- **Informations personnelles** : ID, nom d'utilisateur, email
- **Statut** : Utilisateur standard ou administrateur
- **Déconnexion** : Bouton rouge pour vous déconnecter

### Se déconnecter
1. Allez dans votre **Profil**
2. Cliquez sur le bouton **"Déconnexion"** (rouge)
3. Vous êtes redirigé vers la page de connexion

## 📝 Découvrir et lire les posts

### Page d'accueil - Liste des posts
La page d'accueil affiche tous les posts publiés :

#### Informations visibles pour chaque post :
- **Titre** du post
- **Auteur** et **date de publication**
- **Prévisualisation** du contenu (maximum 5 lignes)
- **Bouton "Lire plus"** pour voir le post complet
- **Compteurs de réactions emoji** (si présentes)

#### Organisation :
- Les posts sont classés par **date de publication** (plus récents en premier)
- **Pagination** automatique si beaucoup de posts

### Lire un post complet
1. Sur la liste des posts, cliquez sur **"Lire plus"**
2. Le post s'ouvre en modal ou dans un nouvel onglet
3. Vous voyez :
   - **Contenu intégral** du post
   - **Tous les commentaires** (sans pagination)
   - **Interface de réaction** (si connecté)
   - **Formulaire de commentaire** (si connecté)

### Fermer la vue détaillée
- **En modal** : Cliquez sur le X ou à côté de la modal
- **Nouvel onglet** : Fermez l'onglet ou revenez au précédent

## 💬 Interagir avec les commentaires

### Lire les commentaires

#### Sur la liste des posts :
- **Maximum 5 commentaires** affichés par post
- **Pagination** disponible s'il y a plus de 5 commentaires
- Informations visibles : auteur, date, contenu

#### Dans la vue détaillée :
- **Tous les commentaires** sont affichés
- **Pas de pagination** dans cette vue
- **Ordre chronologique** (plus récents en premier)

### Ajouter un commentaire
*Fonctionnalité réservée aux utilisateurs connectés*

1. **Connectez-vous** si ce n'est pas déjà fait
2. Ouvrez la **vue détaillée** d'un post
3. Trouvez le **formulaire de commentaire** en bas
4. **Rédigez votre commentaire** dans la zone de texte
5. Cliquez sur **"Publier le commentaire"**
6. Votre commentaire apparaît immédiatement dans la liste

### Conseils pour bien commenter :
- ✅ Soyez constructif et respectueux
- ✅ Apportez une valeur ajoutée à la discussion
- ✅ Relisez-vous avant de publier
- ❌ Évitez le spam ou les messages hors-sujet

## 😄 Système de réactions emoji

### Comprendre les réactions
Le système propose **5 types de réactions** :
- 👍 **Pouce en haut** : J'aime, j'approuve
- ❤️ **Cœur** : J'adore, excellent contenu
- 😂 **Rire** : Drôle, amusant
- 😮 **Surprise** : Surprenant, inattendu
- 😢 **Triste** : Émouvant, touchant

### Voir les réactions
**Visible par tous (connectés ou non) :**
- **Compteurs** à côté de chaque emoji
- **Total des réactions** par post
- Les emojis sans réaction n'affichent pas de compteur

### Réagir à un post
*Fonctionnalité réservée aux utilisateurs connectés*

1. **Connectez-vous** si nécessaire
2. Trouvez les **emojis sous un post**
3. **Cliquez sur l'emoji** de votre choix
4. Le **compteur s'incrémente** immédiatement
5. Votre réaction est **enregistrée**

### Annuler une réaction
1. **Re-cliquez sur le même emoji** que vous avez déjà utilisé
2. Votre réaction est **supprimée**
3. Le **compteur diminue** d'une unité

### Règles des réactions :
- ✅ **Une réaction par type d'emoji** par utilisateur
- ✅ Vous pouvez réagir avec **plusieurs emojis différents**
- ✅ Vous pouvez **changer** vos réactions à tout moment
- ❌ Vous ne pouvez pas mettre **plusieurs fois le même emoji**

## 🎨 Interface et navigation

### Design responsive
- **Mobile** : Interface adaptée aux smartphones
- **Tablette** : Layout optimisé pour tablettes
- **Desktop** : Expérience complète sur ordinateur

### Éléments d'interface

#### Barre de navigation
- **Toujours visible** en haut de page
- **Indicateur de connexion** : Montre si vous êtes connecté
- **Menu adaptatif** selon votre statut (connecté/déconnecté)

#### Messages de feedback
- **Messages de succès** : En vert pour confirmer les actions
- **Messages d'erreur** : En rouge pour signaler les problèmes
- **Chargement** : Indicateurs pendant les opérations

#### Formulaires
- **Validation en temps réel** : Erreurs affichées immédiatement
- **Champs obligatoires** : Marqués clairement
- **Boutons d'action** : États visuels (normal, chargement, désactivé)

### Raccourcis et astuces
- **Esc** : Fermer les modals
- **Clic sur le logo** : Retour à l'accueil
- **Actualisation** : F5 pour recharger le contenu

## 🚫 Limitations pour les visiteurs non connectés

### Ce que vous pouvez faire sans compte :
- ✅ Consulter **tous les posts**
- ✅ Lire le **contenu complet**
- ✅ Voir les **commentaires**
- ✅ Voir les **compteurs de réactions**
- ✅ **Naviguer** librement sur le site

### Ce qui nécessite une connexion :
- ❌ **Commenter** les posts
- ❌ **Réagir** avec les emojis
- ❌ **Créer du contenu** (réservé aux admins)
- ❌ **Accéder au profil**

## 🔐 Sécurité et confidentialité

### Protection de vos données
- **Mots de passe** : Chiffrés et sécurisés
- **Sessions** : Expiration automatique pour la sécurité
- **Données personnelles** : Minimales et protégées

### Bonnes pratiques
- ✅ Utilisez un **mot de passe fort**
- ✅ **Déconnectez-vous** sur les ordinateurs partagés
- ✅ **Ne partagez pas** vos identifiants
- ✅ **Signalez** tout comportement inapproprié

## ❓ Résolution de problèmes courants

### Problème : "Je n'arrive pas à me connecter"
**Solutions :**
1. Vérifiez votre **nom d'utilisateur** (pas l'email)
2. Vérifiez votre **mot de passe** (attention à la casse)
3. Assurez-vous d'avoir créé un compte
4. Contactez l'administrateur si le problème persiste

### Problème : "Mes commentaires n'apparaissent pas"
**Solutions :**
1. Vérifiez que vous êtes **bien connecté**
2. **Actualisez la page** (F5)
3. Vérifiez que le commentaire n'est pas **vide**

### Problème : "Les réactions ne fonctionnent pas"
**Solutions :**
1. **Connectez-vous** d'abord
2. **Attendez** que la page soit complètement chargée
3. **Actualisez** si les compteurs ne se mettent pas à jour

### Problème : "La page ne charge pas"
**Solutions :**
1. **Vérifiez votre connexion** internet
2. **Actualisez** la page (F5)
3. **Videz le cache** de votre navigateur
4. Essayez dans un **autre navigateur**

### Problème : "L'interface est cassée sur mobile"
**Solutions :**
1. **Orientez** votre téléphone (portrait/paysage)
2. **Zoomez/dézoomez** pour ajuster l'affichage
3. **Actualisez** la page
4. Utilisez un **navigateur récent**

## 📱 Utilisation mobile

### Navigateurs recommandés
- ✅ **Chrome** (Android)
- ✅ **Safari** (iOS)
- ✅ **Firefox** (Android/iOS)
- ✅ **Edge** (Android/iOS)

### Spécificités mobiles
- **Menu hamburger** : Navigation dans les petits écrans
- **Gestes tactiles** : Scroll, tap, pinch pour zoomer
- **Chargement optimisé** : Adapté aux connexions mobiles

## 🆘 Obtenir de l'aide

### Ressources disponibles
1. **FAQ** : Questions fréquemment posées
2. **Guide de dépannage** : Solutions aux problèmes techniques
3. **Documentation complète** : Tous les détails techniques

### Contact
Si vous rencontrez des difficultés non résolues par ce manuel :
1. Consultez la [FAQ](./faq.md)
2. Regardez le [guide de dépannage](./troubleshooting.md)
3. Contactez l'équipe de développement

---

## 📚 Documents connexes

- [Guide d'installation](./installation.md)
- [FAQ](./faq.md)
- [Guide de dépannage](./troubleshooting.md)
- [Guide administrateur](./admin-guide.md)

---

*Manuel utilisateur - Projet Mabutu DEV Learn IT B3*