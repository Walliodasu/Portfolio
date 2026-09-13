import { Localized } from './locale.model';

export const PROJECT_CATEGORIES = ['ai', 'data', 'web', 'cloud'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface ProjectLinks {
  readonly github?: string;
  readonly demo?: string;
  readonly article?: string;
}

export interface ProjectImage {
  readonly src: string;
  readonly alt: Localized;
  readonly width: number;
  readonly height: number;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly tagline: Localized;
  readonly description: Localized<readonly string[]>;
  readonly outcomes: Localized<readonly string[]>;
  readonly stack: readonly string[];
  readonly category: ProjectCategory;
  readonly year: number;
  readonly featured: boolean;
  readonly links: ProjectLinks;
  readonly image: ProjectImage;
}
