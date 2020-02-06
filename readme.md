# Projet d'authentification

Projet d'authentification licence professionnelle web de lannion.

Groupe de projet : Adrien Le Deunff et Hugo Boistuaud


# Installation du projet

Commencer par cloner le projet dans un répertoire local.

`git clone https://gitlab.com/breizhsurfer/server.git`


Commande à effectuer dans le répertoire back situé à la racine :

`npm install`


# Lancement du projet

Effectuer cette commande depuis la racine du projet

`docker-compose up -d --build`

Pour accéder à l'application l'url est : http://localhost:8080


# Tests
### remarque :
On pourrait être tenté de se déplacer dans l'application en changeant le chemin dans l'url. L'application front étant buildé pour tourner dans un nginx, si l'on tente de se déplacer comme cela dans l'application, nginx n'arrive pas à trouver la vue adéquate à afficher. Il faut utiliser l'interface graphique pour se déplacer dans l'application.
La page protégée par le login est néanmoins bien sécurisée et ne peut être atteinte sans passer par la phase de connexion (il faut avoir un token pour y avoir accès).
### Action : 
Tenter de se connecter sans s'inscrire.
### Comportement attendu :
Connexion refusée
### Action : 
S'inscrire avec des 2 mots de passe différents
### Comportement attendu :
Inscription échouée
### Action : 
S'inscrire avec un nom d'utilisateur déjà pris
### Comportement attendu :
Inscription échouée
### Action : 
Une fois inscrit, se connecter avec les mêmes identifiants
### Comportement attendu :
Connexion réussie
