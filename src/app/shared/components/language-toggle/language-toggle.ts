import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Locale } from '../../../core/models/locale.model';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'pf-language-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex items-center rounded-lg border border-border-subtle bg-surface-raised p-0.5"
      role="group"
      [attr.aria-label]="i18n.t().language.label"
    >
      @for (locale of i18n.locales; track locale) {
        <button
          type="button"
          class="rounded-md px-2.5 py-1 font-mono text-xs uppercase transition-colors duration-200"
          [class]="
            locale === i18n.locale()
              ? 'bg-accent-500 text-white'
              : 'text-content-muted hover:text-content'
          "
          [attr.aria-pressed]="locale === i18n.locale()"
          [attr.aria-label]="localeLabel(locale)"
          (click)="i18n.setLocale(locale)"
        >
          {{ locale }}
        </button>
      }
    </div>
  `,
})
export class LanguageToggle {
  protected readonly i18n = inject(I18nService);

  protected localeLabel(locale: Locale): string {
    return this.i18n.t().language[locale];
  }
}
