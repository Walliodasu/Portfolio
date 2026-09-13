import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../../core/data/profile.data';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { CompanyLogo } from '../../shared/components/company-logo/company-logo';
import { ExperienceCard } from '../../shared/components/experience-card/experience-card';
import { Icon } from '../../shared/components/icon/icon';
import { IconName } from '../../shared/components/icon/icons';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { TechBadge } from '../../shared/components/tech-badge/tech-badge';
import { Reveal } from '../../shared/directives/reveal.directive';
import { EXPERIENCES } from '../experience/data/experiences.data';
import { KnowledgeGraph } from './knowledge-graph/knowledge-graph';
import { ProjectsService } from '../projects/services/projects.service';
import { SKILL_CATEGORIES } from '../skills/data/skills.data';

interface Stat {
  readonly icon: IconName;
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'pf-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    Icon,
    TechBadge,
    ProjectCard,
    ExperienceCard,
    CompanyLogo,
    KnowledgeGraph,
    SectionHeading,
    Reveal,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly projectsService = inject(ProjectsService);

  protected readonly profile = PROFILE;
  protected readonly featuredProjects = this.projectsService.featured;
  protected readonly currentExperience = EXPERIENCES.find((experience) => !experience.endDate);
  protected readonly pastCompanies = EXPERIENCES;

  protected readonly coreSkills = SKILL_CATEGORIES.flatMap((category) =>
    category.skills.filter((skill) => skill.featured).map((skill) => skill.name),
  ).slice(0, 12);

  protected readonly stats = computed<readonly Stat[]>(() => {
    const labels = this.i18n.t().home.stats;
    const technologies = SKILL_CATEGORIES.reduce(
      (total, category) => total + category.skills.length,
      0,
    );

    return [
      {
        icon: 'briefcase',
        value: `${yearsSince(EXPERIENCES.at(-1)?.startDate)}+`,
        label: labels.experience,
      },
      { icon: 'code', value: `${this.projectsService.projects().length}`, label: labels.projects },
      { icon: 'sparkles', value: `${technologies}`, label: labels.stack },
    ];
  });

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({ title: seo.homeTitle, description: seo.homeDescription, path: '/' });
    });
  }
}

function yearsSince(isoDate: string | undefined): number {
  if (!isoDate) {
    return 0;
  }

  const elapsed = Date.now() - Date.parse(isoDate);
  return Math.max(1, Math.floor(elapsed / (365.25 * 24 * 60 * 60 * 1000)));
}
