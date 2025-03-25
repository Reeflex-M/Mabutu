@echo off
echo Projet Mabutu - Menu de lancement

echo 1. Lancer l'application (frontend + backend)
echo 2. Effectuer les migrations Django
echo 3. Creer un utilisateur pour se connecter
echo 4. Quitter

set /p choix=Entrez votre choix (1, 2, 3 ou 4): 

if "%choix%"=="1" goto lancer_app
if "%choix%"=="2" goto migrations
if "%choix%"=="3" goto creer_user
if "%choix%"=="4" goto fin

:lancer_app
echo Demarrage du projet Mabutu...

:: Lancement du frontend en arriere-plan
start cmd /k "cd frontend && npm run dev"

:: Lancement du backend
echo Demarrage du serveur Django...
cd backend
python manage.py runserver
goto fin

:migrations
echo Execution des migrations Django...
cd backend
echo 1. Creation des migrations
python manage.py makemigrations
echo.
echo 2. Application des migrations
python manage.py migrate
echo.
echo Migrations terminees!
pause
goto fin

:creer_user
echo Creation d'un utilisateur de test...
cd backend
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin')"
echo.
echo Utilisateur cree avec les identifiants suivants:
echo Username: admin
echo Password: admin
echo.
echo Vous pouvez maintenant vous connecter a l'application.
pause
goto fin

:fin
