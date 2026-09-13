import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';
import { SeoService } from '../../../core/services/seo.service';
import { Icon } from '../../../shared/components/icon/icon';
import { TechBadge } from '../../../shared/components/tech-badge/tech-badge';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'pf-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, Icon, TechBadge],
  templateUrl: './project-detail.html',
})
export class ProjectDetail {
  readonly slug = input.required<string>();

  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly projectsService = inject(ProjectsService);

  protected readonly project = computed(() => this.projectsService.findBySlug(this.slug()));

  constructor() {
    effect(() => {
      const project = this.project();
      const seo = this.i18n.t().seo;

      if (!project) {
        this.seo.update({
          title: seo.notFoundTitle,
          description: seo.notFoundDescription,
          path: `/projects/${this.slug()}`,
        });
        return;
      }

      this.seo.update({
        title: project.title,
        description: this.i18n.translate(project.tagline),
        path: `/projects/${project.slug}`,
        image: project.image.src,
        type: 'article',
      });
    });
  }
}
