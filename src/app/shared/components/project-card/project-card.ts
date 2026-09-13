import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from '../../../core/models/project.model';
import { I18nService } from '../../../core/services/i18n.service';
import { Icon } from '../icon/icon';
import { TechBadge } from '../tech-badge/tech-badge';

@Component({
  selector: 'pf-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage, Icon, TechBadge],
  templateUrl: './project-card.html',
  host: { class: 'block h-full' },
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly priority = input(false);

  protected readonly i18n = inject(I18nService);
}
