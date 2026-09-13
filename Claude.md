# CLAUDE.md — Portfolio Angular 20

Ce fichier définit les règles et bonnes pratiques à respecter **systématiquement** lors du développement de ce portfolio Angular. Toute génération de code (composants, services, styles, tests, config) doit s'y conformer. En cas de doute entre une solution "rapide" et une solution "propre et conforme à ces règles", toujours choisir la seconde.

## 1. Vue d'ensemble du projet

- Portfolio personnel développé avec **Angular 20**, orienté vitrine professionnelle (présentation, compétences, projets, expérience, contact).
- Objectifs prioritaires : **SEO**, **performance**, **accessibilité**, **maintenabilité**, code démontrant la maîtrise des pratiques Angular modernes (le code est aussi une vitrine technique).
- Déploiement prévu avec rendu serveur (SSR).

## 2. Stack technique

| Domaine | Choix | Notes |
|---|---|---|
| Framework | Angular 20 | Standalone uniquement, pas de `NgModule` |
| Rendu | Angular SSR (`@angular/ssr`) + hydration | Prerendering des routes statiques quand possible |
| Détection de changements | Zoneless (`provideZonelessChangeDetection`) | Pas de dépendance à `zone.js` |
| État réactif | Signals (`signal`, `computed`, `effect`) | Pas de RxJS pour du state simple ; RxJS réservé aux flux asynchrones (HTTP, events) |
| Style | Tailwind CSS v4 (utility-first, config CSS-first) | Tokens et thème déclarés dans `src/styles.css` via `@theme`, pas de `tailwind.config.js` |
| i18n | Runtime bilingue FR/EN via signals (`I18nService`) | Pas de `@angular/localize` : un seul build, bascule instantanée |
| Formulaires | Reactive Forms typés (`FormGroup<T>`) | Pas de Template-driven forms |
| Tests unitaires | Jasmine + Karma (config par défaut Angular CLI) | |
| Lint / format | ESLint (`angular-eslint`) + Prettier | Doit passer sans erreur avant tout commit |
| Package manager | npm | Ne pas mélanger avec yarn/pnpm (pas de lock files multiples) |
| Icônes | SVG inline ou sprite (pas de dépendance lourde type Font Awesome complet) | |

## 3. Architecture & structure des dossiers

Structure **feature-based**, standalone, sans `NgModule` :

```
src/
├── app/
│   ├── core/                       # Singletons transverses, jamais de composant de page
│   │   ├── data/                   # Données de profil partagées par plusieurs features
│   │   ├── i18n/                   # Dictionnaires FR/EN (translations.ts)
│   │   ├── models/                 # Interfaces/types partagés globaux
│   │   └── services/               # I18nService, ThemeService, SeoService, GithubService
│   ├── layout/                     # Header, footer
│   │   ├── header/
│   │   └── footer/
│   ├── shared/                     # Composants/directives réutilisables, présentationnels
│   │   ├── components/             # icon, section-heading, tech-badge, project-card,
│   │   │                           # experience-card, company-logo, hero-illustration, page-glow…
│   │   └── directives/             # reveal.directive.ts
│   ├── features/                   # Une feature = une page du portfolio
│   │   ├── home/
│   │   ├── about/
│   │   ├── skills/
│   │   │   └── data/
│   │   ├── experience/
│   │   │   └── data/
│   │   ├── projects/
│   │   │   ├── project-list/
│   │   │   ├── project-detail/
│   │   │   ├── data/               # Catalogue statique des projets
│   │   │   ├── services/
│   │   │   └── projects.routes.ts  # Sous-routes de la feature
│   │   ├── contact/
│   │   │   └── services/
│   │   └── not-found/
│   ├── app.config.ts               # Providers navigateur
│   ├── app.config.server.ts        # Providers SSR
│   ├── app.routes.ts               # Routes racine (lazy loading systématique)
│   ├── app.routes.server.ts        # Render modes SSR + getPrerenderParams
│   └── app.ts / app.html
├── environments/                   # environment.ts (prod) + environment.development.ts
├── index.html
└── styles.css                      # Entrée Tailwind v4 + tokens @theme + base layer
```

Règles :
- Chaque feature est **lazy-loadée** via `loadComponent` ou `loadChildren` dans les routes.
- Un composant "feature" (page) orchestre ; les composants "shared/ui" sont purement présentationnels (inputs/outputs uniquement, pas d'injection de service métier).
- Pas de dossier fourre-tout `utils/` géant : une fonction utilitaire vit dans `core/` ou à côté de son unique consommateur si elle n'est pas partagée.

## 4. Conventions de composants

- **Standalone par défaut** — jamais de `NgModule` créé manuellement.
- `ChangeDetectionStrategy.OnPush` sur **tous** les composants.
- API signal pour les entrées/sorties : `input()`, `input.required()`, `output()`, `model()` — ne pas utiliser les décorateurs `@Input()`/`@Output()` sauf contrainte technique justifiée en commentaire.
- Nouvelle syntaxe de contrôle de flux dans les templates : `@if`, `@for` (avec `track` **obligatoire**), `@switch`, `@let`. Les directives structurelles `*ngIf`/`*ngFor`/`*ngSwitch` sont interdites dans le nouveau code.
- Utiliser `@defer` pour différer le chargement des blocs lourds ou hors-viewport (ex. sections basses de la page, widgets non critiques au premier rendu) — impact direct sur les Core Web Vitals.
- Un composant = un dossier avec `foo.ts` + `foo.html`. Le template inline n'est acceptable que pour un composant trivial (< ~20 lignes de template, ex. `pf-icon`, `pf-tech-badge`).
- Nommage Angular 20 : fichiers sans suffixe `.component` (`header.ts` → `export class Header`), `kebab-case` pour les fichiers/sélecteurs, préfixe de sélecteur `pf-` (ex. `pf-project-card`).
- Pas de fichier `.scss` par composant : le style passe par les classes Tailwind dans le template. N'ajouter un `styleUrl` que si une règle CSS est réellement impossible en utility.
- Un composant ne fait jamais d'appel HTTP direct : il délègue à un service injecté (`inject()` de préférence à l'injection par constructeur).
- Logos d'entreprises (page Parcours/Accueil) : fichiers fournis par l'utilisateur dans `public/images/` (ex. `ag2r_logo.jpg`), référencés via `CompanyLogo` (`experience.model.ts` : `src`, `alt`, `width`) dans `experiences.data.ts`, et affichés par `pf-company-logo` (badge carré blanc, `NgOptimizedImage`, `object-contain`). Ne jamais retélécharger ou remplacer ces images sans que l'utilisateur les fournisse explicitement.

## 5. État & données

- État local de composant → `signal()`/`computed()`.
- État partagé entre plusieurs composants → service singleton (`providedIn: 'root'`) exposant des signals en lecture (`asReadonly()`), pas de store externe (NgRx/NgXs) tant que la complexité ne le justifie pas.
- Effets de bord uniquement via `effect()`, jamais de logique métier dans un `effect` (réservé à la synchronisation : titre du document, log, etc.).
- Les appels HTTP passent par `HttpClient` injecté dans un service dédié par domaine (`ProjectsService`, `ContactService`, etc.), typés de bout en bout (interfaces dans `core/models` ou `features/*/models`).
- Pas de `any`. Types stricts partout (`strict: true` dans `tsconfig`, déjà activé par défaut Angular CLI — ne jamais le désactiver).

## 6. Routing

- Un seul fichier de routes racine (`app.routes.ts`), chaque feature exporte ses propres routes si elle a des sous-routes.
- Lazy loading systématique (`loadComponent`/`loadChildren`), pas d'import eager de composants de pages dans les routes.
- Guards et resolvers en **fonctions** (`CanActivateFn`, `ResolveFn`), pas de classes `@Injectable` implémentant des interfaces de guard (API legacy).
- Titres de page définis via la propriété `title` des routes (utile pour SEO/SSR).

## 7. Styles (Tailwind CSS v4)

- Un seul fichier de style global : `src/styles.css`. Il contient `@import 'tailwindcss'`, la variante `@custom-variant dark`, le bloc `@theme` (couleurs, fonts, radius, animations), les surcharges `.dark`, les `@keyframes` et le `@layer base`.
- **Pas de `tailwind.config.js`** : Tailwind v4 est configuré en CSS-first. Toute nouvelle couleur ou police se déclare comme variable dans `@theme`, jamais en dur dans un template.
- Utiliser les tokens sémantiques (`text-content`, `text-content-muted`, `bg-surface`, `bg-surface-raised`, `border-border-subtle`, `text-accent-500`) plutôt que les couleurs brutes de Tailwind, pour que le thème clair/sombre reste cohérent.
- Mobile-first obligatoire : classes de base pour mobile, puis surcharges aux breakpoints (`sm:`/`md:`/`lg:`).
- Dark mode piloté par `ThemeService` via la classe `dark` sur `<html>`, persistée en `localStorage`, avec un script inline dans `index.html` qui applique le thème avant le premier paint (pas de flash).
- Pas de styles inline dans le HTML (`style="..."`) sauf valeur strictement dynamique calculée en TS.

## 7 bis. Internationalisation (FR/EN)

- Tout texte affiché passe par `I18nService` : `i18n.t()` pour les libellés d'interface, `i18n.translate(value)` pour un contenu typé `Localized<T>`.
- Les dictionnaires vivent dans `core/i18n/translations.ts`. Le type `Translations` est **inféré du dictionnaire français** : ajouter une clé en FR force à la fournir en EN, la compilation échoue sinon.
- Les données métier (projets, expériences, formations) stockent leurs textes en `Localized<T>` (`{ fr, en }`), jamais en une seule langue.
- Ne jamais écrire de chaîne de texte affichable en dur dans un template.

## 8. Accessibilité (a11y)

- HTML sémantique (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) — pas de `<div>` partout.
- Attributs ARIA uniquement quand le HTML sémantique ne suffit pas.
- Contraste conforme WCAG AA, focus visible clavier sur tous les éléments interactifs, navigation 100% clavier.
- Attribut `alt` obligatoire et pertinent sur toutes les images ; images décoratives en `alt=""`.
- Formulaire de contact : labels associés (`for`/`id`), messages d'erreur annoncés (`aria-live` ou équivalent).

## 9. Performance & SEO

- `NgOptimizedImage` (`ngSrc`) pour toutes les images de contenu (projets, avatar, etc.).
- `@defer` pour le contenu non critique (sections basses de page, modales, widgets tiers).
- Meta tags dynamiques par route via un service `SeoService` (title, description, Open Graph, Twitter Card) — injecté dans chaque composant de page feature.
- Prerendering des routes statiques (`ng build` avec prerender activé pour home/about/projects/contact).
- Aucune dépendance ajoutée sans justification de poids/valeur (vérifier bundle size avant d'ajouter une lib).
- Images optimisées (format moderne : WebP/AVIF) et lazy loading natif (`loading="lazy"`) hors above-the-fold.

## 10. Tests

- Un fichier `.spec.ts` par composant/service non trivial.
- Priorité aux tests de comportement (rendu conditionnel, interactions utilisateur, sorties émises) plutôt qu'aux détails d'implémentation.
- Services avec logique (formatage de données, appels HTTP) : tests systématiques avec `HttpTestingController` pour mocker les requêtes.
- Le projet étant zoneless, chaque `TestBed.configureTestingModule` doit fournir `provideZonelessChangeDetection()`, et les `effect()` se vident avec `TestBed.tick()`.
- Ne pas viser un pourcentage de couverture arbitraire : tout comportement métier ou logique conditionnelle doit être couvert.
- Aucun navigateur Chrome n'est installé sur ce poste : lancer les tests avec Edge via `$env:CHROME_BIN = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"` avant `npm run test:ci`.

## 11. Qualité de code & outillage

- ESLint (`angular-eslint`) + Prettier doivent passer sans erreur/warning avant de considérer une tâche terminée.
- Pas de `console.log` laissé dans le code final (sauf logger dédié explicitement voulu).
- Noms explicites en anglais pour le code (variables, fonctions, classes) ; contenu textuel du portfolio (UI) en français ou bilingue selon décision produit — mais **code = anglais**, cohérence avec les standards du marché.
- Aucun commentaire qui répète ce que le code montre déjà ; commentaire uniquement pour une contrainte non évidente (ex. workaround SSR, edge case navigateur).

## 12. Git & commits

- Commits au format **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `style:`, `test:`, `chore:`, `docs:`).
- Un commit = un changement logique cohérent, pas de commits fourre-tout.
- Ne jamais commit de secrets/clés (fichier `.env`, clés API) — déjà exclus via `.gitignore`.

## 13. Ce qu'il ne faut jamais faire

- Créer un `NgModule`.
- Utiliser `*ngIf`/`*ngFor`/`*ngSwitch` (syntaxe legacy) dans du nouveau code.
- Utiliser les décorateurs `@Input()`/`@Output()` classiques dans du nouveau code (préférer l'API signal).
- Mettre de la logique métier dans un composant "shared" présentationnel.
- Ajouter une dépendance NgRx/état externe tant que les signals + services suffisent.
- Désactiver `strict` mode TypeScript ou ignorer une erreur ESLint via un commentaire disable sans justification.
- Mélanger plusieurs gestionnaires de paquets (rester sur npm).
