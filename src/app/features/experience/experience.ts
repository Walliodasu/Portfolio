import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { ExperienceCard } from '../../shared/components/experience-card/experience-card';
import { Icon } from '../../shared/components/icon/icon';
import { PageGlow } from '../../shared/components/page-glow/page-glow';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { Reveal } from '../../shared/directives/reveal.directive';
import { EDUCATION, EXPERIENCES } from './data/experiences.data';

@Component({
  selector: 'pf-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceCard, Icon, SectionHeading, Reveal, PageGlow],
  templateUrl: './experience.html',
})
export class Experience {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  protected readonly experiences = EXPERIENCES;
  protected readonly education = EDUCATION;

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({
        title: seo.experienceTitle,
        description: seo.experienceDescription,
        path: '/experience',
      });
    });
  }
}
