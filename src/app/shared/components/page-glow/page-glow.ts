import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Subtle decorative gradient blobs used behind page headers.
 * Purely presentational: place inside a `relative overflow-hidden` ancestor.
 */
@Component({
  selector: 'pf-page-glow',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="absolute -top-24 -left-16 size-72 rounded-full bg-accent-500/15 blur-3xl"
      style="animation: var(--animate-blob)"
    ></div>
    <div
      class="absolute -top-10 right-0 size-64 rounded-full bg-highlight/15 blur-3xl"
      style="animation: var(--animate-blob); animation-delay: -6s"
    ></div>
  `,
  host: { class: 'pointer-events-none absolute inset-0 -z-10', 'aria-hidden': 'true' },
})
export class PageGlow {}
