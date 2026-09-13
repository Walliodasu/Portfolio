import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

import { PROFILE } from '../../core/data/profile.data';
import { I18nService } from '../../core/services/i18n.service';
import { Icon } from '../../shared/components/icon/icon';
import { LanguageToggle } from '../../shared/components/language-toggle/language-toggle';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';

export interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly exact: boolean;
}

@Component({
  selector: 'pf-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon, ThemeToggle, LanguageToggle],
  templateUrl: './header.html',
})
export class Header {
  protected readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);

  protected readonly navItems = computed<readonly NavItem[]>(() => {
    const nav = this.i18n.t().nav;

    return [
      { path: '/', label: nav.home, exact: true },
      { path: '/about', label: nav.about, exact: false },
      { path: '/experience', label: nav.experience, exact: false },
      { path: '/skills', label: nav.skills, exact: false },
      { path: '/projects', label: nav.projects, exact: false },
      { path: '/contact', label: nav.contact, exact: false },
    ];
  });

  constructor() {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
