# 🧹 Nettoyage des fichiers mal placés sur Hostinger

## Problème actuel

Les fichiers ont été uploadés dans un sous-dossier (probablement `public_html/dist/` ou `public_html/frontend/dist/`) au lieu de directement dans `public_html/`.

## ✅ Solution en 3 étapes

### Étape 1 : Trouver où sont les fichiers actuellement

Via FileZilla (SFTP, port 65002) :

1. Connectez-vous
2. Naviguez dans `public_html/`
3. Cherchez où se trouvent `index.html`, `assets/`, `images/`, etc.

Emplacements possibles :
- ❌ `public_html/dist/index.html`
- ❌ `public_html/frontend/dist/index.html`
- ✅ `public_html/index.html` (c'est là qu'ils doivent être)

### Étape 2 : Nettoyer les mauvais emplacements

#### Option A : Via FileZilla (RECOMMANDÉ)

1. Connectez-vous à Hostinger (SFTP)
2. Allez dans `public_html/`
3. **Supprimez** ces dossiers s'ils existent :
   - `dist/`
   - `frontend/`
4. Gardez uniquement les fichiers/dossiers React à la racine :
   - `index.html` ✅
   - `assets/` ✅
   - `images/` ✅
   - `videos/` ✅
   - `vite.svg` ✅

#### Option B : Via Gestionnaire de fichiers Hostinger

1. Allez dans **Fichiers** → **Gestionnaire de fichiers**
2. Naviguez vers `public_html/`
3. Supprimez les dossiers `dist/` ou `frontend/` s'ils existent
4. Assurez-vous que `index.html` est directement dans `public_html/`

### Étape 3 : Redéployer avec le workflow corrigé

Le workflow a été mis à jour pour copier les fichiers **directement** dans `public_html/` :

```bash
git add .
git commit -m "Fix: Deploy files directly to public_html root"
git push origin main
```

Attendez 2-3 minutes que GitHub Actions déploie, puis visitez https://bms-motors.com

## 🎯 Structure finale attendue

```
public_html/
├── index.html              ← Fichier principal React
├── vite.svg               ← Logo Vite
├── assets/
│   ├── index-abc123.js    ← JavaScript bundlé
│   └── index-def456.css   ← CSS bundlé
├── images/
│   ├── logo/
│   │   └── logo.png
│   ├── vehicules/
│   │   ├── Audi_gris1.png
│   │   ├── G8_bleu1.png
│   │   └── ...
│   └── services/
│       └── recherche_personnalisé.jpg
└── videos/
    └── hero_video.mp4
```

## 🧪 Test après nettoyage

1. Visitez : https://bms-motors.com/
2. Vous devriez voir votre site BMS Motors React
3. Vérifiez que les images s'affichent
4. Testez la navigation

## ⚠️ Si le site affiche toujours la page par défaut

### Cache du navigateur
Forcez le rafraîchissement : **Ctrl + F5** (Windows) ou **Cmd + Shift + R** (Mac)

### Fichier index.html par défaut
Il peut y avoir un ancien `index.html` de Hostinger :
1. Dans FileZilla, allez dans `public_html/`
2. Vérifiez la **date de modification** de `index.html`
3. Si c'est une vieille date → supprimez-le
4. Relancez le déploiement

### Configuration du domaine
Dans le panneau Hostinger :
1. Allez dans **Domaines**
2. Vérifiez que `bms-motors.com` pointe vers `public_html/`
3. Si ce n'est pas le cas, modifiez la configuration

## 📊 Checklist de vérification

Après le nettoyage et le redéploiement, vérifiez :

- [ ] `public_html/index.html` existe et est récent (date d'aujourd'hui)
- [ ] `public_html/assets/` contient des fichiers JS et CSS
- [ ] `public_html/images/` contient vos images
- [ ] Aucun dossier `dist/` ou `frontend/` dans `public_html/`
- [ ] https://bms-motors.com/ affiche votre site React
- [ ] Les images du site s'affichent correctement
- [ ] La navigation fonctionne

## 🚀 Si tout fonctionne

Félicitations ! Votre déploiement automatique est maintenant configuré. À chaque push sur GitHub, votre site sera mis à jour automatiquement sur https://bms-motors.com ! 🎉

---

**Besoin d'aide ?** Prenez une capture d'écran de l'arborescence de `public_html/` dans FileZilla et je vous aiderai à corriger !

