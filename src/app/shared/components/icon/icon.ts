import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ICONS, IconDefinition, IconName } from './icons';

@Component({
  selector: 'pf-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.fill]="definition().filled ? 'currentColor' : 'none'"
      [attr.stroke]="definition().filled ? 'none' : 'currentColor'"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (path of definition().paths; track path) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly strokeWidth = input(1.75);

  protected readonly definition = computed<IconDefinition>(() => ICONS[this.name()]);
}
