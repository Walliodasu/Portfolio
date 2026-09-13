import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Wassim TAGHELIT — Data Scientist & Web Developer',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: 'À propos — Wassim TAGHELIT',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'experience',
    title: 'Parcours — Wassim TAGHELIT',
    loadComponent: () => import('./features/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'skills',
    title: 'Compétences — Wassim TAGHELIT',
    loadComponent: () => import('./features/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.routes').then((m) => m.projectsRoutes),
  },
  {
    path: 'contact',
    title: 'Contact — Wassim TAGHELIT',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    title: 'Page introuvable — Wassim TAGHELIT',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
