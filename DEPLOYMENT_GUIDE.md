# 🚀 Guide de Déploiement Automatique - Hostinger

Ce projet utilise GitHub Actions pour déployer automatiquement sur Hostinger à chaque push sur la branche `main` ou `master`.

## 📋 Prérequis

1. Un compte Hostinger avec accès FTP
2. Un repository GitHub
3. Les identifiants FTP de votre hébergement Hostinger

## 🔧 Configuration

### 1. Récupérer vos identifiants SSH/SFTP Hostinger

Connectez-vous à votre panneau Hostinger (hPanel) :

#### Option 1 : Via l'interface Hostinger
1. Allez dans **Hébergement** → Sélectionnez votre site
2. Cliquez sur **Avancé** dans le menu latéral
3. Cherchez la section **Accès SSH** ou **Détails SSH/SFTP**
4. Activez l'accès SSH si ce n'est pas déjà fait
5. Notez les informations suivantes :
   - **Serveur SSH/SFTP** (ex: `srv123.hostinger.com` ou une IP comme `123.45.67.89`)
   - **Port SSH** (généralement `22` ou `65002` pour Hostinger)
   - **Nom d'utilisateur SSH** (ex: `u123456789`)
   - **Mot de passe SSH** (le même que votre hébergement ou celui que vous avez défini)

#### Option 2 : Via la page principale
1. Sur la page d'accueil hPanel
2. Cliquez sur **Fichiers** → **FTP Accounts** ou **SSH Access**
3. Récupérez les informations d'accès SSH/SFTP

### 2. Configurer les Secrets GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu latéral, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**
5. Ajoutez les 3 secrets suivants :

#### Secret 1 : FTP_SERVER
- **Name:** `FTP_SERVER`
- **Value:** Votre serveur SSH/SFTP Hostinger (ex: `srv123.hostinger.com` ou `123.45.67.89`)
- ⚠️ **Important** : N'incluez PAS `sftp://` ou le port, juste le nom d'hôte ou l'IP

#### Secret 2 : FTP_USERNAME
- **Name:** `FTP_USERNAME`
- **Value:** Votre nom d'utilisateur SSH (ex: `u123456789`)

#### Secret 3 : FTP_PASSWORD
- **Name:** `FTP_PASSWORD`
- **Value:** Votre mot de passe SSH/SFTP

### 3. Vérifier la structure du serveur

Assurez-vous que le dossier cible sur Hostinger est correct :
- Par défaut, le workflow déploie vers `/public_html/`
- Si votre dossier web est différent, modifiez la ligne `remote_path` dans `.github/workflows/deploy.yml`

Exemples de dossiers possibles sur Hostinger :
- `/public_html/` (par défaut, le plus courant)
- `/domains/votredomaine.com/public_html/`
- `/home/u123456789/public_html/`

💡 **Astuce** : Connectez-vous via un client SFTP (comme FileZilla) pour vérifier le chemin exact

## 🎯 Utilisation

Une fois configuré, le déploiement est **automatique** :

1. Faites vos modifications dans le code
2. Commitez et poussez vers GitHub :
   ```bash
   git add .
   git commit -m "Votre message de commit"
   git push origin main
   ```
3. GitHub Actions va automatiquement :
   - ✅ Installer les dépendances
   - ✅ Builder le projet React
   - ✅ Déployer sur Hostinger via SFTP

## 📊 Suivi du déploiement

Pour voir l'état du déploiement :
1. Allez sur votre repository GitHub
2. Cliquez sur l'onglet **Actions**
3. Vous verrez la liste de tous les déploiements avec leur statut :
   - ✅ **Vert** : Déploiement réussi
   - ❌ **Rouge** : Erreur (cliquez pour voir les logs)
   - 🟡 **Jaune** : En cours

## 🔍 Structure du Workflow

```yaml
Déclencheur : Push sur main/master
↓
1. Checkout du code
↓
2. Installation de Node.js 18
↓
3. Installation des dépendances (npm ci)
↓
4. Build du projet (npm run build)
↓
5. Upload via SFTP vers Hostinger
```

## ⚠️ Notes Importantes

1. **Première fois** : Le premier déploiement peut prendre 5-10 minutes
2. **Cache** : Les dépendances sont mises en cache pour accélérer les déploiements suivants
3. **Build** : Seul le dossier `frontend/dist/` (version buildée) est déployé
4. **Sécurité** : Ne commitez JAMAIS vos identifiants SSH/SFTP dans le code, utilisez toujours les secrets GitHub
5. **SFTP vs FTP** : Hostinger utilise SFTP (protocole sécurisé), pas FTP classique

## 🛠️ Personnalisation

### Changer la branche de déploiement

Modifiez dans `.github/workflows/deploy.yml` :
```yaml
on:
  push:
    branches:
      - production  # Changez ici
```

### Changer le dossier de destination

Modifiez dans `.github/workflows/deploy.yml` :
```yaml
remote_path: /public_html/  # Changez ici
```

### Nettoyage avant déploiement

Si vous voulez supprimer tous les anciens fichiers avant chaque déploiement :
```yaml
delete_remote_files: true  # ⚠️ Attention : supprime les anciens fichiers
```

## 🆘 Dépannage

### Erreur "ENOTFOUND" ou "server doesn't seem to exist"
- ⚠️ Vérifiez que vous utilisez le bon **hostname SSH** (ex: `srv123.hostinger.com`)
- N'incluez PAS `sftp://` ni le port (`:22`) dans `FTP_SERVER`
- Vérifiez que l'accès SSH est activé dans votre panneau Hostinger

### Erreur "Authentication failed"
- Vérifiez vos identifiants SSH/SFTP dans les secrets GitHub
- Testez la connexion SFTP avec un client comme FileZilla (protocole SFTP, port 22)
- Assurez-vous que le mot de passe est correct (pas de caractères spéciaux mal échappés)

### Erreur "Permission denied"
- Vérifiez que le dossier cible existe sur Hostinger
- Vérifiez les permissions du dossier (doit être 755)
- Vérifiez le chemin complet : `/public_html/` ou `/home/uXXXXXXXXX/public_html/`

### Le site ne se met pas à jour
- Videz le cache de votre navigateur (Ctrl + F5)
- Vérifiez que le chemin `remote_path` est correct
- Vérifiez les logs dans l'onglet Actions de GitHub
- Connectez-vous via SFTP pour vérifier que les fichiers ont bien été uploadés

## 📞 Support

En cas de problème :
1. Consultez les logs dans GitHub Actions
2. Vérifiez votre configuration SSH/SFTP sur Hostinger
3. Assurez-vous que tous les secrets sont correctement configurés
4. Testez la connexion manuellement avec FileZilla (SFTP, port 22)

---

🎉 **Votre site BMS Motors sera maintenant automatiquement déployé à chaque modification !**

