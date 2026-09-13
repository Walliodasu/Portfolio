import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { I18nService } from '../../../core/services/i18n.service';
import { ThemeService } from '../../../core/services/theme.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'pf-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button
      type="button"
      class="grid size-9 place-items-center rounded-lg border border-border-subtle bg-surface-raised text-content-muted transition-colors duration-200 hover:border-accent-500/50 hover:text-content"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      (click)="theme.toggle()"
    >
      <pf-icon [name]="theme.isDark() ? 'sun' : 'moon'" [size]="18" />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  private readonly i18n = inject(I18nService);

  protected label(): string {
    return this.theme.isDark() ? this.i18n.t().theme.toLight : this.i18n.t().theme.toDark;
  }
}
