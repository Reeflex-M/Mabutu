# Django React Tailwind Template

This is a template for a Django + React application with Tailwind CSS integration.

## Project Structure

- `backend/`: Django backend
- `frontend/`: React frontend with Tailwind CSS

## Setup Instructions

### Backend (Django)

1. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

3. Run migrations:

```bash
python manage.py migrate
```

4. Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at http://localhost:8000

### Frontend (React + Tailwind)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000

## Development

- Backend API endpoints will be available at `http://localhost:8000/api/`
- Frontend development server includes hot-reloading
- Tailwind CSS is configured and ready to use in your React components
  "# Mabutu"
  "# Mabutu"
  "# Mabutu"

Doc :
Projet DEV Learn IT B3

Création d’un blog
Application React + backend Django + BDD + Documentation

L’essentiel du projet:

Documentation:
Conception Dev
Page de connexion utilisateur,
Page d’affichage des Post,
Page A propos de l’auteur,
Page de rédaction de post,

Un post une fois publié sera visible à tout le monde.

Si un utilisateur est enregistré, il pourra laisser un commentaire ainsi qu’un emoji sur le post
un compteur du nombre de clic sur l’émoji est présent

Si l’utilisateur connecté à déjà cliqué, re cliquer dessus retire du compteur l’emoji qu’il a mis.
Si l’utilisateur n’est pas connecté il ne peut que visionner les post et les emojis ainsi que leur compteur, mais ne peux pas cliquer sur les emojis

Si la personne connectée est un administrateur, un lien vers la page de rédaction de post est visible
la page de rédaction de post doit être protégée afin qu’aucun utilisateur de type user ne puisse y accéder
Les post affiche au maximum 5 lignes de texte
Pour afficher le post complet un bouton + ouvrira le post en entier (au choix dans une modale, ou dans un nouvel onglet)
Affichage de 5 commentaires max pour chaque post, avec une pagination s’il y a plus
Si on est dans l’affichage complet du post, affichage de tous les commentaire

Rendu du projet:

Toute la documentation doit être rendue au minimum une semaine avant la soutenance.
Le code doit être hébergé sur Github et partager dans la documentation
La soutenance sera sous la forme d’une présentation en équipe le 13 mai 2025, il faudra partager le temps de parole, présenter chaque point de votre application sur une durée de 20 minutes.
La note sera collective au groupe.
