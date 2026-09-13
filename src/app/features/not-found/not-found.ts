import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'pf-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    <section
      class="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:px-8"
    >
      <p
        class="bg-gradient-to-r from-accent-500 to-highlight bg-clip-text font-mono text-7xl font-bold text-transparent"
      >
        {{ i18n.t().notFound.code }}
      </p>
      <h1 class="mt-6 text-2xl font-bold tracking-tight text-content sm:text-3xl">
        {{ i18n.t().notFound.title }}
      </h1>
      <p class="mt-4 text-base text-content-muted">{{ i18n.t().notFound.message }}</p>

      <a
        routerLink="/"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-600"
      >
        <pf-icon name="arrow-left" [size]="16" />
        {{ i18n.t().notFound.backHome }}
      </a>
    </section>
  `,
})
export class NotFound {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({
        title: seo.notFoundTitle,
        description: seo.notFoundDescription,
        path: '/404',
      });
    });
  }
}
