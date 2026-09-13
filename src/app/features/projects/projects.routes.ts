import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    title: 'Projets — Wassim TAGHELIT',
    loadComponent: () => import('./project-list/project-list').then((m) => m.ProjectList),
  },
  {
    path: ':slug',
    loadComponent: () => import('./project-detail/project-detail').then((m) => m.ProjectDetail),
  },
];
