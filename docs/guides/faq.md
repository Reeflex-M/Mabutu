# FAQ - Questions fréquemment posées

## 🎯 Questions générales

### Qu'est-ce que Mabutu ?
Mabutu est une application de blog développée dans le cadre du projet DEV Learn IT B3. Elle permet de publier des posts, commenter et réagir avec des emojis.

### Quelles sont les technologies utilisées ?
- **Frontend** : React 18 + TypeScript + Tailwind CSS
- **Backend** : Django 5.0 + Django REST Framework  
- **Base de données** : SQLite (développement) / MySQL (production)
- **Authentification** : JWT (JSON Web Tokens)

### L'application est-elle gratuite ?
Oui, Mabutu est un projet open source développé à des fins éducatives.

## 👥 Compte utilisateur

### Comment créer un compte ?
1. Cliquez sur "S'inscrire" dans la navigation
2. Remplissez le formulaire avec un nom d'utilisateur unique, email et mot de passe
3. Validez pour créer votre compte

### Puis-je changer mon nom d'utilisateur ?
Non, le nom d'utilisateur ne peut pas être modifié une fois créé. Choisissez-le soigneusement lors de l'inscription.

### Comment récupérer mon mot de passe ?
Actuellement, la récupération de mot de passe n'est pas implémentée. Contactez un administrateur pour réinitialiser votre mot de passe.

### Puis-je supprimer mon compte ?
La suppression de compte n'est pas disponible via l'interface utilisateur. Contactez un administrateur si nécessaire.

## 📝 Posts et contenu

### Qui peut créer des posts ?
Seuls les administrateurs peuvent créer et publier des posts. Les utilisateurs standard peuvent uniquement commenter et réagir.

### Comment devenir administrateur ?
Le statut d'administrateur est accordé par l'équipe de développement. Il n'y a pas de processus automatique pour devenir admin.

### Pourquoi je ne vois que 5 lignes de texte ?
C'est une fonctionnalité intentionnelle. Les posts affichent une prévisualisation de 5 lignes maximum. Cliquez sur "Lire plus" pour voir le contenu complet.

### Les posts sont-ils modérés ?
Oui, les administrateurs peuvent modifier ou supprimer tout contenu inapproprié.

## 💬 Commentaires

### Puis-je modifier mes commentaires ?
Non, les commentaires ne peuvent pas être modifiés une fois publiés. Assurez-vous de bien relire avant de publier.

### Puis-je supprimer mes commentaires ?
Les utilisateurs ne peuvent pas supprimer leurs propres commentaires. Seuls les administrateurs ont cette capacité.

### Y a-t-il une limite de longueur pour les commentaires ?
Il n'y a pas de limite stricte, mais restez raisonnable et pertinent dans vos commentaires.

### Pourquoi mon commentaire n'apparaît pas ?
Vérifiez que :
- Vous êtes bien connecté
- Le commentaire n'est pas vide
- La page est entièrement chargée
- Vous avez actualisé la page

## 😄 Réactions emoji

### Combien de réactions puis-je mettre ?
Vous pouvez mettre une réaction par type d'emoji (5 types disponibles), soit un maximum de 5 réactions par post.

### Puis-je retirer mes réactions ?
Oui, cliquez à nouveau sur l'emoji pour retirer votre réaction.

### Pourquoi je ne peux pas réagir ?
Les réactions sont réservées aux utilisateurs connectés. Créez un compte et connectez-vous pour réagir.

### Les réactions sont-elles anonymes ?
Non, le système enregistre qui a réagi, même si cette information n'est pas publiquement visible.

## 🔐 Sécurité et confidentialité

### Mes données sont-elles sécurisées ?
Oui, nous utilisons des pratiques de sécurité standard :
- Mots de passe chiffrés
- Authentification JWT
- Protection contre les attaques courantes

### Quelles données collectez-vous ?
Nous collectons uniquement :
- Nom d'utilisateur et email
- Contenu que vous publiez (commentaires)
- Réactions emoji
- Logs de connexion basiques

### Partagez-vous mes données ?
Non, vos données ne sont pas partagées avec des tiers. Elles sont utilisées uniquement pour le fonctionnement de la plateforme.

## 🛠️ Problèmes techniques

### L'application ne se charge pas, que faire ?
1. Vérifiez votre connexion internet
2. Actualisez la page (F5)
3. Videz le cache de votre navigateur
4. Essayez un autre navigateur
5. Contactez le support si le problème persiste

### Les emojis ne s'affichent pas correctement
Assurez-vous d'utiliser un navigateur moderne qui supporte les emojis Unicode. Mettez à jour votre navigateur si nécessaire.

### L'interface est cassée sur mobile
- Utilisez un navigateur mobile récent
- Activez JavaScript
- Vérifiez votre connexion
- Essayez l'orientation portrait et paysage

### J'ai des erreurs CORS
Ceci est un problème technique côté serveur. Contactez l'équipe de développement.

## 📱 Compatibilité

### Quels navigateurs sont supportés ?
- **Chrome** 80+ (recommandé)
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

### L'application fonctionne-t-elle sur mobile ?
Oui, l'interface est responsive et optimisée pour :
- Smartphones (Android/iOS)
- Tablettes
- Ordinateurs de bureau

### Puis-je utiliser l'application hors ligne ?
Non, Mabutu nécessite une connexion internet pour fonctionner.

## 🔧 Installation et développement

### Comment installer Mabutu localement ?
Consultez le [Guide d'installation](./installation.md) pour les instructions complètes.

### Puis-je contribuer au développement ?
Oui ! Le projet est open source. Consultez le [Guide de contribution](../developer/contributing.md).

### Comment signaler un bug ?
1. Vérifiez que ce n'est pas un problème connu
2. Rassemblez les informations (navigateur, OS, étapes pour reproduire)
3. Contactez l'équipe de développement

### L'API est-elle documentée ?
Oui, consultez la [Documentation API](../api/README.md) complète.

## 🚀 Fonctionnalités futures

### Quelles nouvelles fonctionnalités sont prévues ?
- Système de récupération de mot de passe
- Édition des commentaires
- Réactions personnalisées
- Notifications en temps réel
- Système de tags/catégories

### Puis-je proposer des améliorations ?
Absolument ! Vos suggestions sont les bienvenues. Contactez l'équipe de développement avec vos idées.

### Quand ces fonctionnalités seront-elles disponibles ?
Le projet est développé dans un cadre éducatif. L'évolution dépend du planning académique et des ressources disponibles.

## 📞 Support et contact

### Comment obtenir de l'aide ?
1. Consultez cette FAQ
2. Lisez le [Manuel utilisateur](./user-manual.md)
3. Vérifiez le [Guide de dépannage](./troubleshooting.md)
4. Contactez l'équipe de développement

### Comment contacter les administrateurs ?
Via l'interface d'administration Django ou directement l'équipe de développement du projet.

### Y a-t-il une communauté d'utilisateurs ?
Le projet étant nouveau et éducatif, la communauté se limite actuellement aux étudiants et enseignants impliqués.

## 📚 Documentation

### Où trouver la documentation complète ?
- [Index de la documentation](../README.md)
- [Manuel utilisateur](./user-manual.md)
- [Guide administrateur](./admin-guide.md)
- [Documentation technique](./architecture.md)

### La documentation est-elle à jour ?
Nous nous efforçons de maintenir la documentation à jour avec chaque version de l'application.

### Puis-je contribuer à la documentation ?
Oui, les améliorations de documentation sont toujours appréciées !

## 🎓 Contexte éducatif

### Quel est l'objectif pédagogique ?
Mabutu sert à apprendre :
- Le développement web fullstack
- L'architecture REST API
- La gestion de projet
- La documentation technique
- Les bonnes pratiques de développement

### Puis-je réutiliser ce code pour mes projets ?
Oui, le projet est open source. Respectez les bonnes pratiques et citez les sources appropriées.

### Comment présenter ce projet ?
Consultez le [Guide de présentation](../guides/presentation.md) pour préparer votre soutenance.

---

## ❓ Question non résolue ?

Si votre question n'est pas couverte par cette FAQ :

1. **Consultez** les autres guides de documentation
2. **Vérifiez** le [Guide de dépannage](./troubleshooting.md)
3. **Contactez** l'équipe de développement

---

*FAQ - Projet Mabutu DEV Learn IT B3*