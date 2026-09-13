import { DOCUMENT, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { TRANSLATIONS, Translations } from '../i18n/translations';
import { DEFAULT_LOCALE, LOCALES, Locale, Localized, isLocale } from '../models/locale.model';

const STORAGE_KEY = 'pf-locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly currentLocale = signal<Locale>(this.readInitialLocale());

  readonly locale = this.currentLocale.asReadonly();
  readonly locales = LOCALES;
  readonly t = computed<Translations>(() => TRANSLATIONS[this.currentLocale()]);

  constructor() {
    effect(() => {
      const locale = this.currentLocale();
      this.document.documentElement.lang = locale;

      if (this.isBrowser) {
        this.persist(locale);
      }
    });
  }

  setLocale(locale: Locale): void {
    this.currentLocale.set(locale);
  }

  toggle(): void {
    this.currentLocale.update((current) => (current === 'fr' ? 'en' : 'fr'));
  }

  /** Resolves a localized value against the active locale. */
  translate<T>(value: Localized<T>): T {
    return value[this.currentLocale()];
  }

  private readInitialLocale(): Locale {
    if (!this.isBrowser) {
      return DEFAULT_LOCALE;
    }

    const stored = this.read(STORAGE_KEY);
    if (isLocale(stored)) {
      return stored;
    }

    const browserLocale = this.document.defaultView?.navigator.language.slice(0, 2);
    return isLocale(browserLocale) ? browserLocale : DEFAULT_LOCALE;
  }

  private read(key: string): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  private persist(locale: Locale): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Storage unavailable (private mode, blocked cookies): the locale stays in memory only.
    }
  }
}
