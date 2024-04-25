# Mentions Légales

## Informations générales

**Nom du mainteneur principal** : Diyaeddine LAOUID  
**Type de projet** : Projet open source sous licence GPLv3  
**Plateforme de développement et d'hébergement** : GitHub  
**URL du projet** : [GitHub SteamWGP](https://github.com/dilaouid/steam-wgp)

## Description du service

SteamWGP est un projet open source conçu pour permettre aux utilisateurs de Steam de se connecter via OpenID avec leurs comptes Steam. Le projet facilite l'agrégation et l'utilisation des informations liées aux comptes des utilisateurs telles que les pseudonymes, les URL de profil, les avatars, les identifiants numériques et les bibliothèques de jeux. SteamWGP n'est aucunement affilié à Steam ou à Valve Corporation, ni à aucune autre entité tierce.

### Collecte de données

Le projet récupère les informations suivantes :

- **Pseudo Steam** : Utilisé pour identifier les utilisateurs sur la plateforme.
- **URL de profil** : Publiquement accessible et utilisée pour la redirection vers le profil Steam.
- **Avatar Hash** : Utilisé pour afficher l'avatar de l'utilisateur.
- **ID numérique Steam** : Utilisé comme identifiant unique pour chaque utilisateur.
- **Bibliothèque de jeux** :
  - Si publique, tous les jeux sont récupérés pour permettre la participation effective aux "steamders".
  - Si privée, aucun jeu n'est récupéré, limitant ainsi l'utilité de la plateforme pour l'utilisateur concerné.
  - Les jeux restent enregistrés dans notre base de données même si la bibliothèque de l'utilisateur devient privée après leur récupération, même si l'utilisateur supprime son compte, ou si le compte est suspendu ou banni. De même si l'utilisateur supprime un jeu de sa bibliothèque, il reste enregistré dans notre base de données. Les jeux sont utilisés pour identifier les jeux en commun entre les utilisateurs et faciliter la recherche de partenaires de jeu.

### Fonctionnalité des Steamders

Les "steamders" sont des espaces virtuels où les joueurs peuvent se réunir pour choisir ensemble à quel jeu jouer. Le système peut récupérer les jeux multijoueurs communs entre tous les joueurs d'une steamder ou tous les jeux multijoueurs des participants.

### Gestion des données

- Les données relatives aux steamders sont conservées indéfiniment dans la base de données.
- Les informations sur les participants d'une steamder sont effacées une fois celle-ci terminée, à l'exception des jeux choisis et des informations persistantes sur la steamder elle-même.

### Suppression des données

Les utilisateurs peuvent supprimer leur compte à tout moment, ce qui entraînera la suppression de toutes les données les concernant, y compris sa bibliothèque de jeux enregistrée dans la base de données. Cependant, une fois un compte supprimé, il sera possible pour l'utilisateur de le restaurer seulement **2 jours** après sa suppression. Cela pour éviter l'abus de ressources serveur lors de la synchronisation des données Steam.

## Droits d'utilisation

Le projet étant sous licence GPLv3, il est interdit de le vendre. Tout usage commercial direct de ce projet est strictement interdit. Ce projet est strictement non lucratif : il est gratuit, ne contient aucune publicité et n'utilise aucun cookie traceur, à l'exception des tokens JWT pour l'authentification des utilisateurs. Il est cependant possible de faire des dons pour soutenir le mainteneur du projet, sans contrepartie directe.

## Licence

Ce projet est publié sous la licence [GNU General Public License v3 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html), qui garantit aux utilisateurs la liberté de partager et de modifier le logiciel tant que toutes les copies modifiées sont également partagées sous la même licence.

## Responsabilités

Le mainteneur du projet ne peut être tenu responsable des interruptions de service ou des pertes de données. Les utilisateurs utilisent le service à leurs propres risques. La fiabilité des données récupérées via Steam et leur intégrité ne sont pas garanties par le mainteneur du projet.

---

Ces mentions légales visent à fournir une transparence complète sur le fonctionnement du projet et ses implications pour les utilisateurs. Pour toute question ou préoccupation supplémentaire, veuillez contacter le mainteneur du projet via les canaux de communication indiqués sur la page du projet GitHub.
