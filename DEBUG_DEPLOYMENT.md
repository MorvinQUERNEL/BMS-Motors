# 🔍 Debug : Fichiers non présents sur Hostinger

## ✅ Checklist de vérification

### 1. Vérifier que le workflow GitHub Actions s'est exécuté

1. Allez sur votre repository GitHub : https://github.com/[votre-username]/BMS-Motors
2. Cliquez sur l'onglet **"Actions"** (en haut)
3. Vous devriez voir la liste des déploiements

#### Que vérifier :
- ✅ **Vert** : Le déploiement a réussi → Les fichiers devraient être sur Hostinger
- ❌ **Rouge** : Le déploiement a échoué → Cliquez dessus pour voir les logs d'erreur
- 🟡 **Jaune** : En cours d'exécution → Attendez qu'il se termine
- ⚪ **Aucun workflow** : Le workflow ne s'est pas déclenché

### 2. Si le workflow est VERT mais les fichiers ne sont pas là

Cela signifie que les fichiers ont été uploadés **au mauvais endroit**. Vérifiez le bon chemin :

#### Option A : Via FileZilla (RECOMMANDÉ)
1. Connectez-vous avec FileZilla (SFTP, port 65002)
2. Naviguez dans l'arborescence
3. Cherchez où se trouve le dossier `public_html` pour bms-motors.com

Chemins possibles :
```
./public_html/                                    ← Domaine principal
./domains/bms-motors.com/public_html/             ← Sous-domaine
./bms-motors.com/public_html/                     ← Variante
/home/u123456789/domains/bms-motors.com/public_html/  ← Chemin absolu
```

#### Option B : Via le panneau Hostinger
1. Allez dans **Fichiers** → **Gestionnaire de fichiers**
2. Naviguez jusqu'à trouver le bon dossier `public_html` pour bms-motors.com
3. Notez le chemin complet

### 3. Si le workflow est ROUGE (échec)

Cliquez sur le workflow échoué dans l'onglet Actions, puis :
1. Cliquez sur **"Deploy to Hostinger via SFTP"**
2. Lisez l'erreur affichée
3. Cherchez des messages comme :
   - `No such file or directory` → Le chemin est incorrect
   - `Permission denied` → Problème de droits d'accès
   - `Connection timeout` → Problème de connexion

### 4. Vérifier les logs du dernier déploiement

Dans l'onglet **Actions** de GitHub :
1. Cliquez sur le dernier workflow "Deploy to Hostinger"
2. Cliquez sur "deploy" dans la colonne de gauche
3. Développez "Deploy to Hostinger via SFTP"
4. Copiez les logs et cherchez :
   ```
   sftp> put -r ./frontend/dist/ [CHEMIN]
   ```
   Le `[CHEMIN]` vous indique où les fichiers ont été envoyés

### 5. Test manuel pour trouver le bon chemin

Connectez-vous avec FileZilla et testez ces chemins dans l'ordre :

1. **Chemin 1** : `./public_html`
   - Si vous voyez déjà des fichiers ici (comme index.html), c'est le bon endroit

2. **Chemin 2** : `./domains/bms-motors.com/public_html`
   - Structure typique Hostinger pour les domaines multiples

3. **Chemin 3** : Cherchez manuellement :
   - Connectez-vous et regardez les dossiers disponibles
   - Cherchez un dossier nommé `domains`, `public_html`, ou `bms-motors.com`

### 6. Une fois le bon chemin trouvé

Mettez à jour le workflow :

```yaml
remote_path: [LE BON CHEMIN ICI]
```

Par exemple :
```yaml
remote_path: ./public_html  # Si domaine principal
# OU
remote_path: ./domains/bms-motors.com/public_html  # Si multi-domaines
```

Puis poussez :
```bash
git add .github/workflows/deploy.yml
git commit -m "Fix: Correct remote path for deployment"
git push origin main
```

## 🧪 Test rapide : Upload manuel

Pour vérifier que tout fonctionne, testez manuellement avec FileZilla :

1. Connectez-vous à Hostinger via SFTP
2. Naviguez vers le dossier `public_html` de bms-motors.com
3. Uploadez **manuellement** un fichier test (ex: `test.txt`)
4. Visitez https://bms-motors.com/test.txt
5. Si vous voyez le fichier → Le chemin est correct !

## 📞 Besoin d'aide ?

Si vous ne trouvez toujours pas, donnez-moi :
1. **Une capture d'écran** de l'arborescence FileZilla après connexion
2. **Les logs** du dernier workflow GitHub Actions (section "Deploy to Hostinger via SFTP")
3. **Le message d'erreur** exact si le workflow est rouge

---

## 🎯 Résolution rapide probable

Le problème le plus courant est que le chemin `./domains/bms-motors.com/public_html` n'existe pas encore.

### Solution :
1. Connectez-vous via FileZilla
2. Si le dossier `domains/bms-motors.com/public_html` n'existe pas, créez-le
3. OU utilisez `./public_html` si bms-motors.com est votre domaine principal
4. Relancez le déploiement

Le site devrait alors apparaître ! 🚀

