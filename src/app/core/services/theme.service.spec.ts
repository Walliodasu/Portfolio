import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.removeItem('pf-theme');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('pf-theme');
  });

  it('derives isDark from the active theme', () => {
    service.setTheme('dark');
    expect(service.isDark()).toBeTrue();

    service.setTheme('light');
    expect(service.isDark()).toBeFalse();
  });

  it('toggles between light and dark', () => {
    service.setTheme('light');

    service.toggle();
    expect(service.theme()).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');
  });

  it('applies the dark class on the document element and persists the choice', () => {
    service.setTheme('dark');
    TestBed.tick();

    expect(document.documentElement.classList.contains('dark')).toBeTrue();
    expect(localStorage.getItem('pf-theme')).toBe('dark');

    service.setTheme('light');
    TestBed.tick();

    expect(document.documentElement.classList.contains('dark')).toBeFalse();
    expect(localStorage.getItem('pf-theme')).toBe('light');
  });
});
