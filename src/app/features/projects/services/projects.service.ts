import { Injectable, computed, signal } from '@angular/core';

import { Project, ProjectCategory } from '../../../core/models/project.model';
import { PROJECTS } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly catalogue = signal<readonly Project[]>(
    [...PROJECTS].sort((a, b) => b.year - a.year),
  );

  readonly projects = this.catalogue.asReadonly();

  readonly featured = computed(() => this.catalogue().filter((project) => project.featured));

  readonly categories = computed<readonly ProjectCategory[]>(() => [
    ...new Set(this.catalogue().map((project) => project.category)),
  ]);

  findBySlug(slug: string): Project | undefined {
    return this.catalogue().find((project) => project.slug === slug);
  }
}
