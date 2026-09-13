import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="alignment()">
      @if (eyebrow(); as label) {
        <p class="mb-3 font-mono text-xs tracking-[0.2em] text-accent-500 uppercase">{{ label }}</p>
      }

      <h2 class="text-3xl font-bold tracking-tight text-content text-balance sm:text-4xl">
        {{ title() }}
      </h2>

      @if (subtitle(); as text) {
        <p
          class="mt-4 max-w-2xl text-base leading-relaxed text-content-muted"
          [class.mx-auto]="centered()"
        >
          {{ text }}
        </p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly eyebrow = input<string>();
  readonly centered = input(false);

  protected alignment(): string {
    return this.centered() ? 'text-center' : '';
  }
}
