# Site Web Dr Serge Chaussé

Site web moderne et professionnel pour le Dr Serge Chaussé, chirurgien-dentiste à Montréal.

## 🚀 Déploiement sur Vercel (via GitHub)

### Étape 1: Créer un dépôt GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"New"** (nouveau dépôt)
3. Nommez le dépôt (ex: `dr-chausse-website`)
4. Laissez-le en **Private** si vous préférez
5. Cliquez **"Create repository"**

### Étape 2: Uploader les fichiers

**Option A - Via l'interface GitHub:**
1. Sur la page du nouveau dépôt, cliquez **"uploading an existing file"**
2. Glissez-déposez tout le contenu du dossier `dr-chausse-website`
3. Cliquez **"Commit changes"**

**Option B - Via Git en ligne de commande:**
```bash
cd dr-chausse-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/dr-chausse-website.git
git push -u origin main
```

### Étape 3: Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub
2. Cliquez **"Add New..."** → **"Project"**
3. Sélectionnez le dépôt `dr-chausse-website`
4. Vercel détectera automatiquement Next.js
5. Cliquez **"Deploy"**

En quelques minutes, votre site sera en ligne avec une URL comme:
`https://dr-chausse-website-XXXX.vercel.app`

### Étape 4: Personnaliser le domaine (optionnel)

Dans Vercel, allez dans **Settings** → **Domains** pour:
- Ajouter un domaine personnalisé (ex: `www.dentiste.com`)
- Configurer les DNS

---

## 📁 Structure du projet

```
dr-chausse-website/
├── app/
│   ├── globals.css    # Styles globaux
│   ├── layout.js      # Layout principal
│   └── page.js        # Page d'accueil
├── public/
│   └── favicon.ico    # Icône du site
├── package.json       # Dépendances
├── next.config.js     # Configuration Next.js
├── tailwind.config.js # Configuration Tailwind CSS
└── README.md          # Ce fichier
```

## ✏️ Personnalisations possibles

### Modifier les textes
Éditez le fichier `app/page.js` pour changer:
- Les descriptions des services
- Les informations de contact
- Les statistiques (années d'expérience, etc.)

### Ajouter des images
1. Placez vos images dans le dossier `public/images/`
2. Référencez-les dans le code avec `/images/nom-image.jpg`

### Modifier les couleurs
Éditez `tailwind.config.js` pour changer la palette de couleurs:
```javascript
colors: {
  'dental': {
    500: '#39996b', // Vert principal
    600: '#287b55',
    // etc.
  }
}
```

---

## 🛠️ Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

---

## 📞 Support

Pour toute question technique, consultez la documentation:
- [Next.js](https://nextjs.org/docs)
- [Vercel](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Site créé pour Dr Serge Chaussé © 2025**
