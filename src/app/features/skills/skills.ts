import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { PageGlow } from '../../shared/components/page-glow/page-glow';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { Reveal } from '../../shared/directives/reveal.directive';
import { SKILL_CATEGORIES } from './data/skills.data';

@Component({
  selector: 'pf-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, TechBadge, Reveal, PageGlow],
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  protected readonly categories = SKILL_CATEGORIES;

  protected readonly trendingSkills = SKILL_CATEGORIES.flatMap((category) =>
    category.skills.filter((skill) => skill.trending),
  );

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({
        title: seo.skillsTitle,
        description: seo.skillsDescription,
        path: '/skills',
      });
    });
  }
}
