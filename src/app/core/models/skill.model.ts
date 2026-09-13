import { Localized } from './locale.model';

export interface Skill {
  readonly name: string;
  /** Highlighted skills are visually emphasised and surfaced on the home page. */
  readonly featured: boolean;
  /** Currently in high demand on the job market — shown with a distinct flame badge. */
  readonly trending?: boolean;
}

export interface SkillCategory {
  readonly id: string;
  readonly label: Localized;
  readonly icon: 'code' | 'globe' | 'chart' | 'sparkles' | 'cloud';
  readonly skills: readonly Skill[];
}
