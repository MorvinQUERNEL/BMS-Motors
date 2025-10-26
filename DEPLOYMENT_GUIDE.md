# 🚀 Guide de Déploiement Automatique - Hostinger

Ce projet utilise GitHub Actions pour déployer automatiquement sur Hostinger à chaque push sur la branche `main` ou `master`.

## 📋 Prérequis

1. Un compte Hostinger avec accès FTP
2. Un repository GitHub
3. Les identifiants FTP de votre hébergement Hostinger

## 🔧 Configuration

### 1. Récupérer vos identifiants FTP Hostinger

Connectez-vous à votre panneau Hostinger (hPanel) :
1. Allez dans **Fichiers** → **Gestionnaire de fichiers**
2. Cliquez sur **Accès FTP**
3. Notez les informations suivantes :
   - **Serveur FTP** (ex: `ftp.votredomaine.com` ou une IP)
   - **Nom d'utilisateur FTP** (ex: `u123456789`)
   - **Mot de passe FTP** (celui que vous avez défini)

### 2. Configurer les Secrets GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu latéral, cliquez sur **Secrets and variables** → **Actions**
4. Cliquez sur **New repository secret**
5. Ajoutez les 3 secrets suivants :

#### Secret 1 : FTP_SERVER
- **Name:** `FTP_SERVER`
- **Value:** Votre serveur FTP (ex: `ftp.votredomaine.com`)

#### Secret 2 : FTP_USERNAME
- **Name:** `FTP_USERNAME`
- **Value:** Votre nom d'utilisateur FTP (ex: `u123456789`)

#### Secret 3 : FTP_PASSWORD
- **Name:** `FTP_PASSWORD`
- **Value:** Votre mot de passe FTP

### 3. Vérifier la structure du serveur

Assurez-vous que le dossier cible sur Hostinger est correct :
- Par défaut, le workflow déploie vers `./public_html/`
- Si votre dossier web est différent, modifiez la ligne `server-dir` dans `.github/workflows/deploy.yml`

Exemples de dossiers possibles :
- `./public_html/` (par défaut)
- `./domains/votredomaine.com/public_html/`
- `./www/`

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
   - ✅ Déployer sur Hostinger via FTP

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
5. Upload via FTP vers Hostinger
```

## ⚠️ Notes Importantes

1. **Première fois** : Le premier déploiement peut prendre 5-10 minutes
2. **Cache** : Les dépendances sont mises en cache pour accélérer les déploiements suivants
3. **Build** : Seul le dossier `frontend/dist/` (version buildée) est déployé
4. **Sécurité** : Ne commitez JAMAIS vos identifiants FTP dans le code, utilisez toujours les secrets GitHub

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
server-dir: ./public_html/  # Changez ici
```

### Nettoyage avant déploiement

Si vous voulez supprimer tous les anciens fichiers avant chaque déploiement :
```yaml
dangerous-clean-slate: true  # ⚠️ Attention : supprime tout
```

## 🆘 Dépannage

### Erreur "Authentication failed"
- Vérifiez vos identifiants FTP dans les secrets GitHub
- Testez la connexion FTP avec un client comme FileZilla

### Erreur "Permission denied"
- Vérifiez que le dossier cible existe sur Hostinger
- Vérifiez les permissions du dossier (doit être 755)

### Le site ne se met pas à jour
- Videz le cache de votre navigateur (Ctrl + F5)
- Vérifiez que le dossier `server-dir` est correct
- Vérifiez les logs dans l'onglet Actions de GitHub

## 📞 Support

En cas de problème :
1. Consultez les logs dans GitHub Actions
2. Vérifiez votre configuration FTP sur Hostinger
3. Assurez-vous que tous les secrets sont correctement configurés

---

🎉 **Votre site BMS Motors sera maintenant automatiquement déployé à chaque modification !**

