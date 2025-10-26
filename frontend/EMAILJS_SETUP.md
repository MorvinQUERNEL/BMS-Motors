# Configuration EmailJS pour BMS Motors

## Étapes de configuration :

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit (jusqu'à 200 emails/mois)

### 2. Ajouter un service email
1. Dans le dashboard, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur (Gmail recommandé)
4. Connectez votre email : **bms.motors.riviera@gmail.com**
5. Notez le **Service ID**

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Créez un nouveau template avec ce contenu :

**Sujet :** Nouvelle demande de contact - BMS Motors

**Contenu :**
```
Nouvelle demande de renseignements reçue !

Nom : {{name}}
Email : {{email}}
Téléphone : {{phone}}
Véhicule recherché : {{vehicle}}

Message :
{{message}}

---
Envoyé depuis le site BMS Motors
```

3. Notez le **Template ID**

### 4. Obtenir votre clé publique
1. Allez dans "Account" → "General"
2. Copiez votre **Public Key**

### 5. Configurer le code
Ouvrez `/frontend/src/components/Contact.jsx` et remplacez :

```javascript
const serviceID = 'YOUR_SERVICE_ID';      // Remplacez par votre Service ID
const templateID = 'YOUR_TEMPLATE_ID';    // Remplacez par votre Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Remplacez par votre Public Key
```

### 6. Vérifier les noms des champs
Assurez-vous que les attributs `name` dans le formulaire correspondent aux variables du template :
- `name` → {{name}}
- `email` → {{email}}
- `phone` → {{phone}}
- `vehicle` → {{vehicle}}
- `message` → {{message}}

## Test
1. Remplissez le formulaire sur votre site
2. Cliquez sur "Envoyer la demande"
3. Vérifiez votre boîte email **bms.motors.riviera@gmail.com**

## Support
- Documentation : https://www.emailjs.com/docs/
- Support : https://www.emailjs.com/support/

---

## Alternative : Backend avec Nodemailer

Si vous préférez un backend propre, je peux vous créer un serveur Node.js avec Express et Nodemailer pour un contrôle total.

