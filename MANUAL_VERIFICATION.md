# 🔍 Vérification Manuelle du Déploiement

## Problème : Workflow VERT mais fichiers absents sur Hostinger

Cela signifie que les fichiers sont probablement uploadés **au mauvais endroit**.

## 📋 Étapes de vérification

### 1. Vérifier que les fichiers sont bien buildés

Dans GitHub Actions, vérifiez l'étape "List files to deploy" :
- Vous devriez voir : `index.html`, `assets/`, etc.
- Si cette liste est vide → Le build a échoué

### 2. Vérifier où les fichiers ont été uploadés

**Via FileZilla (RECOMMANDÉ)** :

1. **Connectez-vous** :
   - Protocole : SFTP
   - Hôte : Votre hostname SSH
   - Port : 65002
   - Username : Votre username
   - Password : Votre password

2. **Cherchez les fichiers** :
   Une fois connecté, cherchez dans ces dossiers :
   ```
   /public_html/
   /domains/bms-motors.com/public_html/
   /www/
   /htdocs/
   / (racine)
   ```

3. **Vérifiez la date de modification** :
   - Les fichiers devraient avoir la date/heure du dernier push
   - Si les fichiers ont une vieille date → ils n'ont pas été mis à jour

### 3. Tester l'upload manuel

Pour confirmer que le chemin est correct :

1. **Avec FileZilla** :
   - Allez dans le dossier `public_html` de bms-motors.com
   - Uploadez un fichier test : `test.html` contenant :
   ```html
   <!DOCTYPE html>
   <html>
   <body>
     <h1>Test Upload</h1>
     <p>Si vous voyez ceci, le dossier est correct !</p>
   </body>
   </html>
   ```

2. **Visitez** : https://bms-motors.com/test.html
   - Si vous voyez le message → Le dossier est correct
   - Si 404 → Mauvais dossier

### 4. Vérifier la structure Hostinger

Hostinger peut avoir différentes structures selon le type d'hébergement :

#### Structure A : Domaine principal unique
```
/ (racine SFTP)
└── public_html/
    ├── index.html
    ├── assets/
    └── ...
```
**Chemin à utiliser** : `./public_html` ou `public_html`

#### Structure B : Multi-domaines
```
/ (racine SFTP)
└── domains/
    └── bms-motors.com/
        └── public_html/
            ├── index.html
            ├── assets/
            └── ...
```
**Chemin à utiliser** : `./domains/bms-motors.com/public_html`

#### Structure C : Chemin absolu
```
/home/u123456789/
└── public_html/
    ├── index.html
    ├── assets/
    └── ...
```
**Chemin à utiliser** : `/home/u123456789/public_html` ou `~/public_html`

### 5. Trouver le bon chemin

**Méthode 1 : Via FileZilla**
1. Connectez-vous
2. Regardez le chemin affiché en haut de la fenêtre
3. Naviguez jusqu'au dossier `public_html` correct
4. Le chemin complet s'affiche en haut → C'est celui à utiliser !

**Méthode 2 : Via terminal SSH (si disponible)**
```bash
ssh -p 65002 u123456789@srv123.hostinger.com
pwd  # Affiche le chemin actuel
ls -la  # Liste les dossiers
cd public_html  # Va dans public_html
pwd  # Affiche le chemin complet
```

### 6. Vérifier les permissions

Les fichiers uploadés doivent avoir les bonnes permissions :
- Dossiers : `755` (drwxr-xr-x)
- Fichiers : `644` (-rw-r--r--)

Dans FileZilla :
- Clic droit sur un fichier → Permissions de fichier
- Vérifiez que "Lecture" est coché pour "Propriétaire", "Groupe" et "Public"

## 🛠️ Solutions selon le diagnostic

### Si les fichiers sont dans un autre dossier

Les fichiers ont été uploadés mais au mauvais endroit :
1. Notez où ils se trouvent
2. Mettez à jour `remote_path` dans `.github/workflows/deploy.yml`
3. Poussez les modifications

### Si aucun fichier n'a été uploadé

Le déploiement SFTP a échoué silencieusement :
1. Vérifiez les logs GitHub Actions détaillés
2. Essayez le workflow alternatif : lancez `Deploy to Hostinger (Alternative Method)` manuellement
3. Vérifiez les permissions du dossier distant

### Si le dossier public_html n'existe pas

Créez-le manuellement :
1. Via FileZilla : clic droit → Créer un répertoire → `public_html`
2. Ou via le gestionnaire de fichiers Hostinger

## 📊 Checklist finale

- [ ] Les fichiers sont buildés (vérifiés dans GitHub Actions)
- [ ] La connexion SFTP fonctionne (testée avec FileZilla)
- [ ] Le dossier `public_html` existe sur Hostinger
- [ ] Le chemin dans le workflow correspond au chemin réel
- [ ] Les permissions sont correctes (755 pour dossiers, 644 pour fichiers)
- [ ] Le site https://bms-motors.com affiche le nouveau contenu

## 🚨 Debug ultime

Si rien ne fonctionne, uploadez **manuellement** via FileZilla pour confirmer :
1. Buildez localement : `cd frontend && npm run build`
2. Connectez-vous via FileZilla
3. Uploadez tout le contenu de `frontend/dist/` vers `public_html/`
4. Visitez https://bms-motors.com
5. Si ça fonctionne → Le problème est dans le workflow GitHub
6. Si ça ne fonctionne pas → Le problème est la configuration Hostinger/DNS

---

**Besoin d'aide ?** Donnez-moi :
1. Une capture d'écran de l'arborescence FileZilla
2. Le contenu complet des logs "Deploy to Hostinger via SFTP"
3. Le résultat de https://bms-motors.com (404, page par défaut, ou autre)

