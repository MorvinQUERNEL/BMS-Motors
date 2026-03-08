# BMS-Motors

**Site vitrine pour une entreprise d'import/export de vehicules** - Application React moderne avec formulaire de contact.

## Stack Technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 18, Vite 6, CSS custom |
| **Contact** | EmailJS (envoi d'emails cote client) |

## Fonctionnalites

- **Catalogue vehicules** : presentation des vehicules disponibles a l'import/export
- **Formulaire de contact** : envoi d'emails via EmailJS (sans backend)
- **Design responsive** : adapte mobile, tablette et desktop
- **SPA** : navigation fluide sans rechargement

## Installation

```bash
# Cloner le repository
git clone https://github.com/MorvinQUERNEL/BMS-Motors.git
cd BMS-Motors/frontend

# Installer les dependances
npm install

# Configurer EmailJS (voir EMAILJS_SETUP.md)

# Lancer en developpement
npm run dev
```

## Structure

```
BMS-Motors/
└── frontend/
    ├── src/           # Code source React
    ├── public/        # Assets statiques
    ├── index.html     # Point d'entree
    ├── vite.config.js
    └── package.json
```

## Auteur

**Morvin QUERNEL** - Developpeur Full-Stack
