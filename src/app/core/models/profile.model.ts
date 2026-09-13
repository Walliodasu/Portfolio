import { Localized } from './locale.model';

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly url: string;
  readonly icon: 'github' | 'linkedin' | 'mail' | 'phone';
}

export interface Language {
  readonly name: Localized;
  readonly level: string;
}

export interface Profile {
  readonly fullName: string;
  readonly role: Localized;
  readonly headline: Localized;
  readonly bio: Localized<readonly string[]>;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly githubUsername: string;
  readonly availability: Localized;
  readonly resumeUrl: string;
  readonly socials: readonly SocialLink[];
  readonly languages: readonly Language[];
}
