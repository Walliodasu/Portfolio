import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../icon/icon';

@Component({
  selector: 'pf-tech-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <span [class]="classes()">
      @if (trending()) {
        <pf-icon name="flame" [size]="10" />
      } @else if (highlighted()) {
        <pf-icon name="star" [size]="10" />
      }
      {{ label() }}
    </span>
  `,
  host: { class: 'inline-flex' },
})
export class TechBadge {
  readonly label = input.required<string>();
  readonly highlighted = input(false);
  readonly trending = input(false);

  protected classes(): string {
    const base =
      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200';

    if (this.trending()) {
      return `${base} border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400`;
    }

    return this.highlighted()
      ? `${base} border-accent-500/40 bg-accent-500/10 text-accent-600 dark:text-accent-300`
      : `${base} border-border-subtle bg-surface-raised text-content-muted hover:border-accent-500/40 hover:text-content`;
  }
}
