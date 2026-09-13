import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { PROFILE } from '../../core/data/profile.data';
import { Localized } from '../../core/models/locale.model';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { PageGlow } from '../../shared/components/page-glow/page-glow';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { Reveal } from '../../shared/directives/reveal.directive';
import { EDUCATION } from '../experience/data/experiences.data';

interface Highlight {
  readonly icon: IconName;
  readonly label: Localized;
}

@Component({
  selector: 'pf-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, Reveal, PageGlow],
  templateUrl: './about.html',
})
export class About {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  protected readonly profile = PROFILE;
  protected readonly education = EDUCATION;

  protected readonly highlights: readonly Highlight[] = [
    { icon: 'sparkles', label: { fr: 'IA générative & RAG', en: 'Generative AI & RAG' } },
    { icon: 'chart', label: { fr: 'Data engineering', en: 'Data engineering' } },
    { icon: 'code', label: { fr: 'Applications Angular', en: 'Angular applications' } },
    { icon: 'cloud', label: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' } },
  ];

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({ title: seo.aboutTitle, description: seo.aboutDescription, path: '/about' });
    });
  }
}
