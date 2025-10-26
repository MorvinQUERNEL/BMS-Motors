# 🔑 Guide Rapide : Trouver vos Identifiants SSH Hostinger

## ⚠️ Erreur actuelle
L'erreur `Could not resolve hostname ftp` signifie que le serveur dans votre secret `FTP_SERVER` n'est pas correct.

## 📍 Comment trouver le BON hostname SSH sur Hostinger

### Méthode 1 : Via le panneau hPanel (RECOMMANDÉ)

1. **Connectez-vous à Hostinger** : https://hpanel.hostinger.com/
2. **Cliquez sur votre hébergement** (dans la liste des sites)
3. Dans le menu latéral gauche, cherchez **"Avancé"** ou **"Advanced"**
4. Cliquez sur **"SSH Access"** ou **"Accès SSH"**
5. Vous verrez une section qui ressemble à :

```
┌─────────────────────────────────────────┐
│ SSH Access Details                      │
├─────────────────────────────────────────┤
│ Hostname:    srv123.hostinger.com       │  ← COPIEZ CECI
│ Port:        65002 (ou 22)               │  ← COPIEZ CECI AUSSI !
│ Username:    u123456789                  │  ← COPIEZ CECI
│ Password:    [Votre mot de passe]        │
└─────────────────────────────────────────┘

⚠️ **IMPORTANT** : Hostinger utilise souvent le port **65002** au lieu de 22 !
```

### Méthode 2 : Via la section Fichiers

1. **Connectez-vous à Hostinger**
2. Allez dans **"Fichiers"** → **"FTP Accounts"**
3. Cherchez la section **"SFTP/SSH Details"**
4. Le hostname sera affiché là

## ✅ Format CORRECT pour GitHub Secrets

### Secret `FTP_SERVER` :
```
srv123.hostinger.com
```
OU (si on vous donne une IP)
```
123.45.67.89
```

### Secret `SSH_PORT` (NOUVEAU - IMPORTANT !) :
Si Hostinger affiche le port **65002** dans votre panneau :
```
65002
```
Sinon, laissez vide (le workflow utilisera 65002 par défaut)

### ❌ Formats INCORRECTS à éviter :
- `ftp.votredomaine.com` ❌ (c'est pour FTP classique, pas SFTP)
- `sftp://srv123.hostinger.com` ❌ (pas de protocole)
- `srv123.hostinger.com:22` ❌ (pas de port)
- `votredomaine.com` ❌ (ce n'est pas le serveur SSH)

## 🔍 Exemples de hostnames Hostinger valides :

Hostinger utilise généralement ces formats :
- `srv123.hostinger.com` (où 123 est un numéro de serveur)
- `srv456.hostinger.fr`
- `srv789.hostinger.co.uk`
- Ou une IP directe : `185.123.45.67`

## 📝 Checklist de vérification

Avant de mettre à jour vos secrets GitHub, vérifiez :

- [ ] Le hostname commence par `srv` suivi d'un numéro
- [ ] Le hostname se termine par `.hostinger.com` (ou autre TLD)
- [ ] Il n'y a PAS de `ftp://`, `sftp://`, `http://`
- [ ] Il n'y a PAS de `:22` ou autre port à la fin
- [ ] Le username commence généralement par `u` suivi de chiffres
- [ ] L'accès SSH est **activé** dans votre panneau Hostinger

## 🧪 Test manuel (FORTEMENT RECOMMANDÉ)

Avant de lancer GitHub Actions, testez votre connexion avec FileZilla :

1. **Téléchargez FileZilla** : https://filezilla-project.org/
2. **Configurez une nouvelle connexion** :
   - Protocole : **SFTP - SSH File Transfer Protocol**
   - Hôte : `srv123.hostinger.com` (votre hostname)
   - Port : **`65002`** (essayez d'abord 65002, puis 22 si ça ne marche pas)
   - Type d'authentification : **Normal**
   - Identifiant : `u123456789` (votre username)
   - Mot de passe : votre mot de passe

3. **Cliquez sur "Connexion rapide"**

💡 **Astuce** : Si la connexion échoue avec le port 65002, essayez le port 22

Si ça fonctionne avec FileZilla, ça fonctionnera avec GitHub Actions ! ✅

## 🔄 Mise à jour des secrets GitHub

Une fois que vous avez les bonnes informations :

1. Allez sur votre repository GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Vérifiez/modifiez ces secrets :
   - **FTP_SERVER** : Le hostname (ex: `srv123.hostinger.com`)
   - **FTP_USERNAME** : Votre username SSH (ex: `u123456789`)
   - **FTP_PASSWORD** : Votre mot de passe SSH
   - **SSH_PORT** (optionnel) : Si différent de 65002, créez ce secret avec le bon port
4. **Sauvegardez** les modifications

⚠️ **Note** : Par défaut, le workflow utilise le port **65002**. Créez le secret `SSH_PORT` seulement si votre port est différent.

## 🚨 Erreurs courantes

### "Could not resolve hostname ftp"
→ Vous avez mis `ftp.votredomaine.com` au lieu du hostname SSH Hostinger

### "Could not resolve hostname ***"
→ Le hostname dans votre secret est vide ou invalide

### "Connection refused" ou "Operation timed out"
→ Le port est incorrect. Hostinger utilise généralement le port **65002** au lieu de 22
→ Vérifiez le port dans votre panneau Hostinger SSH Access
→ L'accès SSH n'est peut-être pas activé dans votre panneau

### "Authentication failed"
→ Username ou mot de passe incorrect

## 💡 Note importante

**Ne confondez pas** :
- **FTP** : Ancien protocole non sécurisé (port 21)
- **SFTP** : Protocole sécurisé via SSH (port 22) ← **C'est celui-ci qu'on utilise**

Hostinger fournit généralement les deux, mais **nous utilisons SFTP** pour plus de sécurité.

---

🎯 **Une fois les bons identifiants configurés, poussez simplement votre code et le déploiement devrait fonctionner !**

