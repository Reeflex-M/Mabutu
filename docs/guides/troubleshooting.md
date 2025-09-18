# Guide de résolution de problèmes - Mabutu

## 🚨 Problèmes courants et solutions

Ce guide vous aide à résoudre les problèmes les plus fréquents rencontrés avec Mabutu.

## 🔧 Problèmes d'installation

### Python/Django

#### "Module not found: django"
**Symptômes :** Erreur lors du lancement de `python manage.py`

**Solutions :**
1. Vérifiez que l'environnement virtuel est activé :
   ```bash
   # Windows
   .\\venv\\Scripts\\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

2. Réinstallez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```

3. Vérifiez la version de Python :
   ```bash
   python --version  # Doit être 3.8+
   ```

#### "Error loading MySQLdb module"
**Symptômes :** Erreur de connexion à MySQL

**Solutions :**
1. Utilisez SQLite pour le développement (déjà configuré)
2. Pour MySQL, installez le driver :
   ```bash
   pip install mysqlclient
   ```

#### "Port already in use"
**Symptômes :** Django ne peut pas démarrer sur le port 8000

**Solutions :**
1. Trouvez et tuez le processus :
   ```bash
   # Windows
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:8000 | xargs kill -9
   ```

2. Utilisez un autre port :
   ```bash
   python manage.py runserver 8001
   ```

### Node.js/React

#### "npm ERR! peer deps missing"
**Symptômes :** Erreurs de dépendances lors de `npm install`

**Solutions :**
1. Supprimez le cache npm :
   ```bash
   npm cache clean --force
   ```

2. Supprimez node_modules et réinstallez :
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Utilisez la commande avec --legacy-peer-deps :
   ```bash
   npm install --legacy-peer-deps
   ```

#### "Port 3000 already in use"
**Symptômes :** React ne peut pas démarrer

**Solutions :**
1. Tuez le processus existant :
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:3000 | xargs kill -9
   ```

2. Utilisez un autre port :
   ```bash
   npm start -- --port 3001
   ```

#### "command not found: npm"
**Symptômes :** npm n'est pas reconnu

**Solutions :**
1. Installez Node.js depuis https://nodejs.org/
2. Redémarrez votre terminal
3. Vérifiez l'installation :
   ```bash
   node --version
   npm --version
   ```

## 🌐 Problèmes de connexion

### CORS Errors

#### "Access-Control-Allow-Origin"
**Symptômes :** Erreur CORS dans la console du navigateur

**Solutions :**
1. Vérifiez la configuration Django :
   ```python
   # backend/main/settings.py
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:3000",
       "http://127.0.0.1:3000",
   ]
   CORS_ALLOW_CREDENTIALS = True
   ```

2. Redémarrez le serveur Django

#### "Network Error" dans Axios
**Symptômes :** Requêtes API échouent

**Solutions :**
1. Vérifiez que le backend Django fonctionne :
   ```bash
   curl http://localhost:8000/api/
   ```

2. Vérifiez l'URL de l'API dans le frontend :
   ```javascript
   // frontend/.env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

### Problèmes d'authentification

#### "Token is invalid or expired"
**Symptômes :** Déconnexion automatique fréquente

**Solutions :**
1. Vérifiez la configuration JWT :
   ```python
   # backend/main/settings.py
   SIMPLE_JWT = {
       'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
       'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
   }
   ```

2. Videz le localStorage du navigateur :
   ```javascript
   localStorage.clear()
   ```

#### "Authentication credentials were not provided"
**Symptômes :** API refuse les requêtes authentifiées

**Solutions :**
1. Vérifiez le header Authorization :
   ```javascript
   headers: {
       'Authorization': `Bearer ${token}`
   }
   ```

2. Vérifiez que le token existe :
   ```javascript
   const token = localStorage.getItem('token')
   console.log('Token:', token)
   ```

## 💾 Problèmes de base de données

### SQLite Database Locked

#### "database is locked"
**Symptômes :** Erreur de base de données verrouillée

**Solutions :**
1. Fermez toutes les connexions Django
2. Supprimez le fichier de base de données :
   ```bash
   rm backend/db.sqlite3
   python manage.py migrate
   ```

3. Recréez les données de test :
   ```bash
   python manage.py createsuperuser
   ```

### Migration Errors

#### "No such table"
**Symptômes :** Erreur de table manquante

**Solutions :**
1. Créez et appliquez les migrations :
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

2. Si les migrations sont corrompues :
   ```bash
   rm backend/mabutu/migrations/0*.py
   python manage.py makemigrations mabutu
   python manage.py migrate
   ```

## 🎨 Problèmes d'interface

### Tailwind CSS

#### "Styles not applied"
**Symptômes :** Classes Tailwind ne fonctionnent pas

**Solutions :**
1. Vérifiez la configuration Tailwind :
   ```javascript
   // frontend/tailwind.config.js
   content: ['./src/**/*.{js,jsx,ts,tsx}']
   ```

2. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

3. Purgez le cache CSS :
   ```bash
   rm -rf node_modules/.cache
   npm run dev
   ```

### Responsive Design

#### "Interface broken on mobile"
**Symptômes :** Layout cassé sur mobile

**Solutions :**
1. Vérifiez la meta viewport :
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. Testez dans un navigateur mobile récent
3. Utilisez les outils de développement pour simuler mobile

## 🔍 Problèmes de performance

### Slow Loading

#### "Application loads slowly"
**Symptômes :** Chargement lent de l'application

**Solutions :**
1. Vérifiez la console du navigateur pour les erreurs
2. Optimisez les requêtes API :
   ```python
   # Utilisez select_related pour éviter les requêtes N+1
   Post.objects.select_related('author').all()
   ```

3. Activez le cache de développement :
   ```bash
   # Ajoutez dans settings.py
   CACHES = {
       'default': {
           'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
       }
   }
   ```

### Memory Issues

#### "Out of memory" errors
**Symptômes :** Plantage du navigateur ou serveur

**Solutions :**
1. Redémarrez les serveurs
2. Fermez les onglets inutiles
3. Vérifiez les fuites mémoire dans le code

## 🐛 Débogage avancé

### Logs Django

#### Activer les logs détaillés
```python
# backend/main/settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

### Console Browser

#### Déboguer JavaScript
```javascript
// Activez les logs détaillés
console.log('Debug info:', data)

// Vérifiez les erreurs réseau
fetch('/api/posts/')
  .then(response => {
    console.log('Response:', response)
    return response.json()
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

### Django Debug Toolbar

#### Installation pour plus d'infos
```bash
pip install django-debug-toolbar
```

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'debug_toolbar',
]

MIDDLEWARE = [
    # ...
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]
```

## 🛠️ Outils de diagnostic

### Vérification de l'environnement

#### Script de diagnostic complet
```bash
#!/bin/bash
echo "=== Diagnostic Mabutu ==="

echo "1. Versions des outils"
python --version
node --version
npm --version

echo "2. Statut des ports"
netstat -an | grep :3000
netstat -an | grep :8000

echo "3. Processus Django"
ps aux | grep manage.py

echo "4. Processus Node"
ps aux | grep node

echo "5. Espace disque"
df -h

echo "6. Test connectivité API"
curl -s http://localhost:8000/api/ || echo "API non accessible"

echo "7. Test frontend"
curl -s http://localhost:3000 || echo "Frontend non accessible"
```

### Tests de connectivité

#### Tester l'API manuellement
```bash
# Test endpoint public
curl http://localhost:8000/api/posts/

# Test authentification
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

## 📞 Obtenir de l'aide

### Avant de demander de l'aide

1. **Consultez cette documentation** complètement
2. **Reproduisez le problème** de manière fiable
3. **Rassemblez les informations** :
   - Système d'exploitation
   - Versions de Python/Node.js
   - Messages d'erreur complets
   - Étapes pour reproduire

### Informations à fournir

```
Système: Windows 10 / macOS 12 / Ubuntu 20.04
Python: 3.9.0
Node.js: 16.14.0
Navigateur: Chrome 95.0

Erreur:
[Coller le message d'erreur complet]

Étapes pour reproduire:
1. [Action 1]
2. [Action 2]
3. [Résultat attendu vs obtenu]
```

### Ressources d'aide

1. **Documentation Mabutu** : [docs/](../README.md)
2. **Django Documentation** : https://docs.djangoproject.com/
3. **React Documentation** : https://reactjs.org/docs/
4. **Stack Overflow** : Pour les problèmes techniques génériques

---

## 📚 Documents connexes

- [Guide d'installation](./installation.md)
- [FAQ](./faq.md)
- [Manuel utilisateur](./user-manual.md)
- [Architecture technique](./architecture.md)

---

*Guide de résolution de problèmes - Projet Mabutu DEV Learn IT B3*