import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'pf-theme';
const DARK_CLASS = 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly currentTheme = signal<Theme>(this.readInitialTheme());

  readonly theme = this.currentTheme.asReadonly();
  readonly isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
      this.document.documentElement.style.colorScheme = theme;

      if (this.isBrowser) {
        this.persist(theme);
      }
    });
  }

  toggle(): void {
    this.currentTheme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
  }

  private readInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'dark';
    }

    const stored = this.read(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    const prefersLight = this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: light)',
    ).matches;
    return prefersLight ? 'light' : 'dark';
  }

  private read(key: string): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  private persist(theme: Theme): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage unavailable: the theme stays in memory for this session only.
    }
  }
}
