import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.removeItem('pf-locale');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    service = TestBed.inject(I18nService);
  });

  afterEach(() => {
    localStorage.removeItem('pf-locale');
  });

  it('exposes translations matching the active locale', () => {
    service.setLocale('fr');
    expect(service.t().nav.home).toBe('Accueil');

    service.setLocale('en');
    expect(service.t().nav.home).toBe('Home');
  });

  it('toggles between the two supported locales', () => {
    service.setLocale('fr');

    service.toggle();
    expect(service.locale()).toBe('en');

    service.toggle();
    expect(service.locale()).toBe('fr');
  });

  it('resolves a localized value against the active locale', () => {
    const value = { fr: 'Bonjour', en: 'Hello' };

    service.setLocale('en');
    expect(service.translate(value)).toBe('Hello');

    service.setLocale('fr');
    expect(service.translate(value)).toBe('Bonjour');
  });

  it('persists the locale and reflects it on the document element', () => {
    service.setLocale('en');
    TestBed.tick();

    expect(localStorage.getItem('pf-locale')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
