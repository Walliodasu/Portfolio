import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { Experience } from '../../../core/models/experience.model';
import { I18nService } from '../../../core/services/i18n.service';
import { CompanyLogo } from '../company-logo/company-logo';
import { Icon } from '../icon/icon';
import { TechBadge } from '../tech-badge/tech-badge';

@Component({
  selector: 'pf-experience-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, TechBadge, CompanyLogo],
  templateUrl: './experience-card.html',
})
export class ExperienceCard {
  readonly experience = input.required<Experience>();

  protected readonly i18n = inject(I18nService);
}
