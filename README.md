# Portfolio — Wassim TAGHELIT

Portfolio personnel développé avec **Angular 20**, rendu côté serveur et prérendu pour le SEO.

## Stack

- **Angular 20** — standalone, zoneless change detection, signals, nouvelle syntaxe de contrôle de flux (`@if` / `@for` / `@defer`)
- **Angular SSR** (`@angular/ssr`) — prerendering de toutes les routes, y compris les pages de détail projet
- **Tailwind CSS v4** — configuration CSS-first (`@theme` dans `src/styles.css`), dark mode par classe
- **EmailJS** — formulaire de contact fonctionnel sans backend
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
```

Les conventions de développement à respecter sont décrites dans [Claude.md](Claude.md).

## Configuration à compléter

Avant mise en ligne, renseigner :

1. **EmailJS** — `serviceId`, `templateId` et `publicKey` dans `src/environments/environment.ts` et `environment.development.ts`. Le template EmailJS doit accepter les variables `from_name`, `from_email`, `subject` et `message`.
2. **URL du site** — `siteUrl` dans `src/environments/environment.ts` (utilisé pour les URLs canoniques et les balises Open Graph).
3. **CV** — déposer le PDF dans `public/documents/CV_Wassim_TAGHELIT.pdf`.
4. **Projets** — remplacer les fiches placeholder de `src/app/features/projects/data/projects.data.ts` et les visuels de `public/images/projects/`.
5. **LinkedIn** — vérifier l'URL du profil dans `src/app/core/data/profile.data.ts`.
6. **Image Open Graph** — ajouter `public/images/og-cover.png` (1200×630) pour les aperçus de partage.

## Internationalisation

Le site est bilingue français / anglais avec bascule instantanée, sans rechargement ni build séparé. Les libellés d'interface vivent dans `src/app/core/i18n/translations.ts` : le type est inféré du dictionnaire français, donc toute clé ajoutée en français doit l'être en anglais sous peine d'erreur de compilation.
