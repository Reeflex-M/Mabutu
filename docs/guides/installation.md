# Guide d'installation - Mabutu

## 🎯 Prérequis système

### Logiciels requis
- **Node.js** : version 16.x ou supérieure
- **Python** : version 3.8 ou supérieure
- **Git** : pour cloner le repository
- **Un éditeur de code** : VS Code recommandé

### Système d'exploitation
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu 20.04+, CentOS 8+)

### Ressources matérielles minimales
- **RAM** : 4 GB minimum, 8 GB recommandé
- **Stockage** : 2 GB d'espace libre
- **Processeur** : x64 compatible

## 📥 Installation complète

### Étape 1 : Cloner le repository

```bash
# Cloner le project depuis GitHub
git clone https://github.com/Reeflex-M/Mabutu.git

# Aller dans le dossier du projet
cd Mabutu
```

### Étape 2 : Configuration du Backend (Django)

#### 2.1 Créer un environnement virtuel

```bash
# Sur Windows
python -m venv venv
.\\venv\\Scripts\\activate

# Sur macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Installer les dépendances Python

```bash
cd backend
pip install -r requirements.txt
```

#### 2.3 Configuration de la base de données

```bash
# Créer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un super utilisateur (administrateur)
python manage.py createsuperuser
```

#### 2.4 (Optionnel) Charger des données de test

```bash
# Créer des données d'exemple
python manage.py shell -c \"
from django.contrib.auth.models import User
from mabutu.models import Post, Comment

# Créer un utilisateur de test
user = User.objects.create_user('testuser', 'test@example.com', 'testpass123')

# Créer des posts d'exemple
admin = User.objects.filter(is_staff=True).first()
if admin:
    Post.objects.create(
        title='Premier post de bienvenue',
        content='Bienvenue sur Mabutu ! Ceci est un exemple de post pour découvrir les fonctionnalités de notre blog.',
        author=admin
    )
\"
```

### Étape 3 : Configuration du Frontend (React)

#### 3.1 Installer les dépendances Node.js

```bash
# Retourner à la racine et aller dans frontend
cd ../frontend

# Installer les packages npm
npm install
```

#### 3.2 Configuration des variables d'environnement

Créer un fichier `.env` dans le dossier `frontend` :

```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BASE_URL=http://localhost:3000
```

### Étape 4 : Lancement de l'application

#### 4.1 Méthode 1 : Lancement séparé

**Terminal 1 - Backend :**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```

#### 4.2 Méthode 2 : Script automatique (Windows)

Utiliser le script batch fourni :
```batch
# Depuis la racine du projet
launch.bat

# Choisir l'option 1 pour lancer l'application complète
```

### Étape 5 : Vérification de l'installation

#### 5.1 URLs de l'application
- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:8000
- **Admin Django** : http://localhost:8000/admin

#### 5.2 Test de connectivité

1. Ouvrir http://localhost:3000
2. Créer un compte utilisateur
3. Se connecter avec le compte créé
4. Vérifier la navigation entre les pages

## 🛠️ Configuration avancée

### Base de données MySQL (Production)

#### 1. Installer MySQL
```bash
# Ubuntu/Debian
sudo apt-get install mysql-server mysql-client

# macOS avec Homebrew
brew install mysql

# Windows : Télécharger depuis mysql.com
```

#### 2. Créer la base de données
```sql
CREATE DATABASE mabutu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mabutu_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON mabutu.* TO 'mabutu_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 3. Modifier les settings Django
```python
# backend/main/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mabutu',
        'USER': 'mabutu_user',
        'PASSWORD': 'votre_mot_de_passe',
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': \"SET sql_mode='STRICT_TRANS_TABLES'\",
        },
    }
}
```

#### 4. Installer le driver MySQL
```bash
pip install mysqlclient
```

### Variables d'environnement de production

#### Backend (.env)
```bash
# backend/.env
DEBUG=False
SECRET_KEY=votre_clé_secrète_très_longue_et_complexe
ALLOWED_HOSTS=votre-domaine.com,www.votre-domaine.com
DATABASE_URL=mysql://user:password@localhost/mabutu

# Sécurité JWT
JWT_SECRET_KEY=autre_clé_secrète_pour_jwt
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_LIFETIME=3600  # 1 heure
JWT_REFRESH_TOKEN_LIFETIME=86400  # 24 heures

# Email (optionnel)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=votre-email@gmail.com
EMAIL_HOST_PASSWORD=votre-mot-de-passe-app
```

#### Frontend (.env.production)
```bash
# frontend/.env.production
REACT_APP_API_URL=https://votre-api.com/api
REACT_APP_BASE_URL=https://votre-site.com
GENERATE_SOURCEMAP=false
```

## 🐛 Résolution des problèmes courants

### Problème : "Module not found: django"
**Solution :**
```bash
# Vérifier que l'environnement virtuel est activé
source venv/bin/activate  # Linux/macOS
.\\venv\\Scripts\\activate  # Windows

# Réinstaller Django
pip install Django==5.0.1
```

### Problème : "Port 3000 already in use"
**Solution :**
```bash
# Changer le port du frontend
npm start -- --port 3001

# Ou tuer le processus existant
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

### Problème : CORS errors
**Solution :**
Vérifier dans `backend/main/settings.py` :
```python
CORS_ALLOWED_ORIGINS = [
    \"http://localhost:3000\",
    \"http://127.0.0.1:3000\",
]
CORS_ALLOW_CREDENTIALS = True
```

### Problème : Base de données verrouillée (SQLite)
**Solution :**
```bash
cd backend
python manage.py dbshell
.quit

# Ou supprimer le fichier de base de données
rm db.sqlite3
python manage.py migrate
```

### Problème : Packages npm non installés
**Solution :**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📋 Checklist d'installation

### Backend Django
- [ ] Python 3.8+ installé
- [ ] Environnement virtuel créé et activé
- [ ] Dépendances installées (`pip install -r requirements.txt`)
- [ ] Migrations appliquées (`python manage.py migrate`)
- [ ] Super utilisateur créé
- [ ] Serveur démarre sans erreur (`python manage.py runserver`)

### Frontend React
- [ ] Node.js 16+ installé
- [ ] Dépendances installées (`npm install`)
- [ ] Variables d'environnement configurées
- [ ] Application démarre sans erreur (`npm run dev`)
- [ ] Page accessible sur http://localhost:3000

### Tests de fonctionnement
- [ ] Inscription/connexion utilisateur fonctionne
- [ ] Navigation entre les pages sans erreur
- [ ] API accessible depuis le frontend
- [ ] Admin Django accessible
- [ ] Création de posts (admin)
- [ ] Ajout de commentaires (utilisateur connecté)

## 🚀 Prochaines étapes

Après l'installation réussie :

1. **Configuration** : [Guide de configuration](./environment.md)
2. **Premier usage** : [Guide de démarrage rapide](./quickstart.md)
3. **Utilisation** : [Manuel utilisateur](./user-manual.md)
4. **Administration** : [Guide administrateur](./admin-guide.md)

---

## 📞 Support

En cas de problème avec l'installation :

1. Consulter la [FAQ](./faq.md)
2. Vérifier les [problèmes courants](./troubleshooting.md)
3. Consulter la documentation des [technologies utilisées](../developer/technologies.md)

---

*Guide d'installation - Projet Mabutu DEV Learn IT B3*