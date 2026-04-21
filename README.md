# PlanCraft AI — Guide de déploiement

## Structure du projet

```
plancraft/
├── public/
│   └── index.html       ← Frontend complet (landing + app)
├── api/
│   └── generate.js      ← Backend sécurisé (appel API Anthropic)
├── vercel.json          ← Configuration Vercel
├── package.json
└── README.md
```

---

## Déploiement en 5 étapes (gratuit)

### Étape 1 — Obtenir une clé API Anthropic
1. Va sur https://console.anthropic.com
2. Crée un compte (gratuit)
3. Dans "API Keys", clique "Create Key"
4. Copie la clé (commence par `sk-ant-...`)

### Étape 2 — Créer un compte Vercel
1. Va sur https://vercel.com
2. Clique "Sign Up" → continue avec GitHub (gratuit)
3. Si tu n'as pas GitHub : https://github.com → crée un compte

### Étape 3 — Mettre le projet sur GitHub
1. Sur GitHub, clique "New repository"
2. Nomme-le `plancraft-ai`, clique "Create repository"
3. Sur ton PC, installe Git : https://git-scm.com
4. Dans le dossier du projet, exécute :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TON-USERNAME/plancraft-ai.git
   git push -u origin main
   ```

### Étape 4 — Déployer sur Vercel
1. Sur https://vercel.com, clique "Add New Project"
2. Sélectionne ton repo `plancraft-ai`
3. Clique "Deploy" (sans rien changer)

### Étape 5 — Ajouter ta clé API (IMPORTANT)
1. Dans Vercel, va dans ton projet → "Settings" → "Environment Variables"
2. Ajoute une variable :
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-xxxxxxxxxxxxxxx` (ta clé)
3. Clique "Save"
4. Va dans "Deployments" → clique les 3 points → "Redeploy"

✅ Ton SaaS est en ligne ! Vercel te donne une URL gratuite du type :
`https://plancraft-ai.vercel.app`

---

## Pour aller plus loin (monétisation)

### Ajouter des paiements Mobile Money
- **Wave / Orange Money** : intègre leur API pour accepter les paiements locaux
- **Stripe** (cartes internationales) : https://stripe.com — crée un account

### Ajouter l'authentification
- **Clerk** (https://clerk.com) — le plus simple, gratuit jusqu'à 10k users
- Gère login/signup en 30 minutes

### Limiter les plans gratuits
Dans `api/generate.js`, ajoute une vérification de l'abonnement avant d'appeler l'API Anthropic.

---

## Support
Des questions ? Consulte la documentation Vercel : https://vercel.com/docs
