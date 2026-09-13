import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

export interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
  readonly type?: 'website' | 'article' | 'profile';
}

const SITE_NAME = 'Wassim TAGHELIT';
const DEFAULT_IMAGE = '/images/og-cover.png';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: PageMeta): void {
    const url = `${environment.siteUrl}${page.path}`;
    const image = `${environment.siteUrl}${page.image ?? DEFAULT_IMAGE}`;
    const fullTitle = page.path === '/' ? page.title : `${page.title} — ${SITE_NAME}`;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:type', content: page.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  setStructuredData(schema: Record<string, unknown>): void {
    const existing = this.document.getElementById('pf-structured-data');
    existing?.remove();

    const script = this.document.createElement('script');
    script.id = 'pf-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }

    link.href = url;
  }
}
