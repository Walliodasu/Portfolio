# Portfolio — Wassim TAGHELIT

Portfolio personnel développé avec **Angular 20**, rendu côté serveur et prérendu pour le SEO.

## Stack

- **Angular 20** — standalone, zoneless change detection, signals, nouvelle syntaxe de contrôle de flux (`@if` / `@for` / `@defer`)
- **Angular SSR** (`@angular/ssr`) — prerendering de toutes les routes, y compris les pages de détail projet
- **Tailwind CSS v4** — configuration CSS-first (`@theme` dans `src/styles.css`), dark mode par classe
- **EmailJS** via une **Cloudflare Pages Function** (`functions/api/contact.ts`) — le formulaire de contact appelle `/api/contact`, qui relaie vers EmailJS côté serveur : aucune clé EmailJS n'est jamais expédiée dans le bundle du navigateur
- **Jasmine + Karma** — tests unitaires
- **ESLint** (`angular-eslint`) + **Prettier**

## Démarrage

```bash
npm install
npm start            # http://localhost:4200
```

## Scripts

| Commande | Description |
|---|---|
| `npm start` | Serveur de développement |
| `npm run build` | Build de production + prerendering |
| `npm run serve:ssr:portfolio` | Sert le build SSR (`node dist/portfolio/server/server.mjs`) |
| `npm test` | Tests unitaires en mode watch |
| `npm run test:ci` | Tests unitaires en headless, une passe |
| `npm run lint` / `npm run lint:fix` | Analyse statique ESLint |
| `npm run format` / `npm run format:check` | Formatage Prettier |

> Les tests ont besoin d'un navigateur Chromium. Si Chrome n'est pas installé, pointer `CHROME_BIN` vers Edge :
>
> ```powershell
> $env:CHROME_BIN = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
> npm run test:ci
> ```

## Structure

```
src/app/
├── core/         # Modèles, données de profil, dictionnaires i18n, services singleton
├── layout/       # Header, footer
├── shared/       # Composants et directives réutilisables et présentationnels
└── features/     # Une page = une feature, lazy-loadée (home, about, skills, experience, projects, contact)
functions/
└── api/contact.ts  # Cloudflare Pages Function : relaie le formulaire de contact vers EmailJS côté serveur
```

Les conventions de développement à respecter sont décrites dans [Claude.md](Claude.md).

## Configuration à compléter

Avant mise en ligne, renseigner :

1. **EmailJS** — dans le dashboard **Cloudflare Pages** du projet (Settings → Environment variables), définir en variables d'environnement **serveur** (jamais dans le code) :
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_PRIVATE_KEY` (optionnel — la « Private Key » EmailJS, pour authentifier l'appel serveur à serveur)

   Le template EmailJS doit accepter les variables `from_name`, `from_email`, `subject` et `message`. Pour tester en local, les Functions ne tournent pas avec `ng serve` : utiliser `npx wrangler pages dev dist/portfolio/browser` après un `npm run build`, avec un fichier `.dev.vars` (non committé) contenant ces mêmes variables.
2. **URL du site** — `siteUrl` dans `src/environments/environment.ts` (utilisé pour les URLs canoniques et les balises Open Graph).
3. **CV** — déposer le PDF dans `public/documents/CV_Wassim_TAGHELIT.pdf`.
4. **Projets** — remplacer les fiches placeholder de `src/app/features/projects/data/projects.data.ts` et les visuels de `public/images/projects/`.
5. **LinkedIn** — vérifier l'URL du profil dans `src/app/core/data/profile.data.ts`.
6. **Image Open Graph** — ajouter `public/images/og-cover.png` (1200×630) pour les aperçus de partage.

## Internationalisation

Le site est bilingue français / anglais avec bascule instantanée, sans rechargement ni build séparé. Les libellés d'interface vivent dans `src/app/core/i18n/translations.ts` : le type est inféré du dictionnaire français, donc toute clé ajoutée en français doit l'être en anglais sous peine d'erreur de compilation.
