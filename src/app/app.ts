import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PROFILE } from './core/data/profile.data';
import { I18nService } from './core/services/i18n.service';
import { SeoService } from './core/services/seo.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'pf-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
})
export class App {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PROFILE.fullName,
      jobTitle: PROFILE.role.en,
      email: `mailto:${PROFILE.email}`,
      telephone: PROFILE.phone,
      address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
      sameAs: PROFILE.socials
        .filter((social) => social.url.startsWith('https://'))
        .map((social) => social.url),
    });
  }
}
