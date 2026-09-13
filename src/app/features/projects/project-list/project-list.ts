import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { GITHUB_USERNAME, PROFILE } from '../../../core/data/profile.data';
import { GithubRepo } from '../../../core/models/github-repo.model';
import { ProjectCategory } from '../../../core/models/project.model';
import { GithubService } from '../../../core/services/github.service';
import { I18nService } from '../../../core/services/i18n.service';
import { SeoService } from '../../../core/services/seo.service';
import { Icon } from '../../../shared/components/icon/icon';
import { PageGlow } from '../../../shared/components/page-glow/page-glow';
import { ProjectCard } from '../../../shared/components/project-card/project-card';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { Reveal } from '../../../shared/directives/reveal.directive';
import { ProjectsService } from '../services/projects.service';

type CategoryFilter = ProjectCategory | 'all';

@Component({
  selector: 'pf-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCard, SectionHeading, Icon, Reveal, PageGlow],
  templateUrl: './project-list.html',
})
export class ProjectList {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly projectsService = inject(ProjectsService);
  private readonly github = inject(GithubService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly profile = PROFILE;
  protected readonly selectedCategory = signal<CategoryFilter>('all');

  protected readonly filters = computed<readonly CategoryFilter[]>(() => [
    'all',
    ...this.projectsService.categories(),
  ]);

  protected readonly visibleProjects = computed(() => {
    const category = this.selectedCategory();
    const projects = this.projectsService.projects();

    return category === 'all'
      ? projects
      : projects.filter((project) => project.category === category);
  });

  protected readonly repos = rxResource<readonly GithubRepo[], boolean>({
    params: () => this.isBrowser,
    stream: ({ params: isBrowser }) =>
      isBrowser ? this.github.getPublicRepos(GITHUB_USERNAME) : of([]),
    defaultValue: [],
  });

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({
        title: seo.projectsTitle,
        description: seo.projectsDescription,
        path: '/projects',
      });
    });
  }

  protected filterLabel(filter: CategoryFilter): string {
    const projects = this.i18n.t().projects;
    return filter === 'all' ? projects.all : projects.categories[filter];
  }

  protected selectCategory(filter: CategoryFilter): void {
    this.selectedCategory.set(filter);
  }
}
