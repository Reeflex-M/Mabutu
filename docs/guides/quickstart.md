# Guide de démarrage rapide - Mabutu

## ⚡ Démarrage en 5 minutes

Ce guide vous permet de démarrer rapidement avec Mabutu, que vous soyez développeur ou utilisateur final.

## 🎯 Pour les utilisateurs finaux

### 1. Accès à la plateforme
```
URL: http://localhost:3000
```

### 2. Première visite (2 minutes)
1. **Consultez la liste des posts** sur la page d'accueil
2. **Cliquez sur "Lire plus"** pour voir un post complet
3. **Observez les compteurs** de réactions emoji

### 3. Créer un compte (1 minute)
1. **Cliquez sur "S'inscrire"**
2. **Remplissez le formulaire** :
   - Nom d'utilisateur : `testuser`
   - Email : `test@example.com`
   - Mot de passe : `motdepasse123`
3. **Validez** → Vous êtes automatiquement connecté

### 4. Première interaction (2 minutes)
1. **Ajoutez un commentaire** sur un post
2. **Réagissez avec un emoji** 👍 ou ❤️
3. **Consultez votre profil** via le menu

✅ **Félicitations !** Vous maîtrisez les bases de Mabutu.

## 🔧 Pour les développeurs

### Prérequis
- Node.js 16+
- Python 3.8+
- Git

### Installation express (5 minutes)

#### 1. Cloner et configurer (2 minutes)
```bash
# Cloner le repository
git clone https://github.com/Reeflex-M/Mabutu.git
cd Mabutu
```

#### 2. Backend Django (2 minutes)
```bash
# Setup backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
# Username: admin, Password: admin
```

#### 3. Frontend React (1 minute)
```bash
# Setup frontend (nouveau terminal)
cd frontend
npm install
```

#### 4. Lancement
```bash
# Terminal 1 - Backend
cd backend && python manage.py runserver

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

### URLs importantes
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000/api/
- **Admin Django** : http://localhost:8000/admin/

✅ **C'est prêt !** L'application est fonctionnelle.

## 🚀 Script automatique (Windows)

### Méthode la plus rapide
```batch
# Depuis la racine du projet
launch.bat

# Menu interactif :
# 1. Lancer l'application
# 2. Effectuer les migrations  
# 3. Créer un utilisateur
```

## 🎨 Première utilisation complète

### Scénario complet (10 minutes)

#### Étape 1 : Préparation de données (2 minutes)
```bash
# Créer un utilisateur admin de test
cd backend
python manage.py shell -c "
from django.contrib.auth.models import User
from mabutu.models import Post

# Admin user
admin = User.objects.filter(is_staff=True).first()
if admin:
    # Post d'exemple
    Post.objects.create(
        title='Bienvenue sur Mabutu !',
        content='Ceci est le premier post de notre blog. Découvrez toutes les fonctionnalités : commentaires, réactions emoji, et bien plus !',
        author=admin
    )
"
```

#### Étape 2 : Test utilisateur (3 minutes)
1. **Ouvrir** http://localhost:3000
2. **S'inscrire** avec un nouveau compte
3. **Commenter** le post d'exemple
4. **Réagir** avec plusieurs emojis
5. **Explorer** son profil

#### Étape 3 : Test administrateur (3 minutes)
1. **Se connecter** avec le compte admin
2. **Créer un nouveau post** (lien visible uniquement pour admin)
3. **Accéder à l'admin Django** : http://localhost:8000/admin/
4. **Explorer** les données dans l'interface d'administration

#### Étape 4 : Validation (2 minutes)
1. **Vérifier** que les posts s'affichent correctement
2. **Tester** la responsive design (redimensionner la fenêtre)
3. **Valider** que les permissions fonctionnent (visitor vs user vs admin)

## 📱 Test mobile rapide

### Sur téléphone/tablette
1. **Trouvez l'IP** de votre ordinateur de développement
2. **Accédez** à `http://[IP]:3000` depuis votre mobile
3. **Testez** l'interface responsive
4. **Validez** les interactions tactiles

### Exemple
```bash
# Trouver l'IP (Windows)
ipconfig | findstr IPv4

# Trouver l'IP (Mac/Linux)  
ifconfig | grep inet

# Puis sur mobile : http://192.168.1.100:3000
```

## 🔍 Validation rapide des fonctionnalités

### Checklist de validation (5 minutes)

#### Interface utilisateur
- [ ] **Page d'accueil** : Liste des posts affichée
- [ ] **Navigation** : Menus fonctionnels
- [ ] **Responsive** : Interface adaptée à la taille d'écran

#### Authentification
- [ ] **Inscription** : Création de compte fonctionne
- [ ] **Connexion** : Login avec les identifiants
- [ ] **Profil** : Informations utilisateur affichées
- [ ] **Déconnexion** : Logout fonctionne

#### Posts
- [ ] **Affichage** : Posts visibles avec prévisualisation
- [ ] **Lecture complète** : Modal ou nouvel onglet
- [ ] **Création** : Nouveau post (admin uniquement)

#### Interactions
- [ ] **Commentaires** : Ajout et affichage
- [ ] **Réactions emoji** : Compteurs et interactions
- [ ] **Permissions** : Restrictions selon le rôle

#### Administration
- [ ] **Admin Django** : Accès et navigation
- [ ] **Gestion des posts** : CRUD fonctionnel
- [ ] **Modération** : Accès aux commentaires

## 🐛 Dépannage express

### Problème : Backend ne démarre pas
```bash
# Vérifier l'environnement Python
python --version  # Doit être 3.8+
pip install -r requirements.txt
python manage.py check
```

### Problème : Frontend ne démarre pas
```bash
# Vérifier Node.js
node --version  # Doit être 16+
npm install
npm run dev
```

### Problème : CORS errors
```python
# backend/main/settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Problème : Base de données
```bash
# Reset de la base de données
rm backend/db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

## 📚 Prochaines étapes

### Après le démarrage réussi

#### Pour les utilisateurs
1. **Lire** le [Manuel utilisateur complet](./user-manual.md)
2. **Explorer** toutes les fonctionnalités
3. **Contribuer** avec du contenu

#### Pour les développeurs
1. **Étudier** l'[Architecture technique](./architecture.md)
2. **Consulter** la [Documentation API](../api/README.md)
3. **Personnaliser** selon vos besoins

#### Pour les administrateurs
1. **Lire** le [Guide administrateur](./admin-guide.md)
2. **Configurer** la modération
3. **Planifier** la création de contenu

## 💡 Conseils pour une expérience optimale

### Performance
- **Navigateur moderne** recommandé (Chrome, Firefox, Safari, Edge)
- **Connexion stable** pour une meilleure expérience
- **Résolution minimale** : 320px (mobile)

### Sécurité
- **Mots de passe forts** pour tous les comptes
- **Déconnexion** après utilisation
- **Mise à jour** régulière des dépendances

### Contenu
- **Posts de qualité** pour engager la communauté
- **Modération active** pour maintenir un environnement sain
- **Interaction** régulière avec les utilisateurs

## 🎉 Félicitations !

Vous avez maintenant une instance fonctionnelle de Mabutu ! 

### Prochaines étapes recommandées
1. **Personnaliser** le contenu selon vos besoins
2. **Inviter** des utilisateurs à tester
3. **Collecter** les retours pour améliorer
4. **Déployer** en production si satisfait

---

## 📞 Besoin d'aide ?

- **Documentation complète** : [README principal](../README.md)
- **Questions techniques** : [Guide de dépannage](./troubleshooting.md)
- **FAQ** : [Questions fréquentes](./faq.md)

---

*Guide de démarrage rapide - Projet Mabutu DEV Learn IT B3*