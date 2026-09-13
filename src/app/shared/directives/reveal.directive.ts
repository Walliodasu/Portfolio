import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

/**
 * Fades content in when it enters the viewport.
 * Server-side and reduced-motion renders keep the element visible with no animation.
 */
@Directive({
  selector: '[pfReveal]',
  host: { '[style.animation-delay.ms]': 'delay()' },
})
export class Reveal {
  readonly delay = input(0, { alias: 'pfReveal', transform: numberAttribute });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.observe());
  }

  private observe(): void {
    const node = this.element.nativeElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    node.style.opacity = '0';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        node.style.removeProperty('opacity');
        node.style.animation = 'var(--animate-fade-up)';
        // The animation's "both" fill-mode would otherwise leave `transform: translateY(0)`
        // applied forever, which creates a new containing block for any fixed/absolute-positioned
        // descendant (e.g. a modal) — clearing the inline style once it ends avoids that trap.
        node.addEventListener('animationend', () => node.style.removeProperty('animation'), {
          once: true,
        });
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    );

    observer.observe(node);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
