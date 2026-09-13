import { Localized } from './locale.model';

export interface ExperienceHighlight {
  readonly title: Localized;
  readonly description: Localized;
}

export interface CompanyLogo {
  /** Path under `public/images/` to the company's real logo file (square, provided by the user). */
  readonly src: string;
  readonly alt: string;
  /** Intrinsic square size in pixels, required by `NgOptimizedImage`. */
  readonly width: number;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly logo: CompanyLogo;
  readonly role: Localized;
  readonly location: string;
  readonly startDate: string;
  /** `null` marks the current position. */
  readonly endDate: string | null;
  readonly period: Localized;
  readonly highlights: readonly ExperienceHighlight[];
  readonly stack: readonly string[];
}

export interface Education {
  readonly id: string;
  readonly degree: Localized;
  readonly school: string;
  readonly period: Localized;
  readonly focus: Localized<readonly string[]>;
}
