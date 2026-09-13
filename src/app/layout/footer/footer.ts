import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROFILE } from '../../core/data/profile.data';
import { I18nService } from '../../core/services/i18n.service';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'pf-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly i18n = inject(I18nService);

  protected readonly profile = PROFILE;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly navItems = computed(() => {
    const nav = this.i18n.t().nav;

    return [
      { path: '/about', label: nav.about },
      { path: '/experience', label: nav.experience },
      { path: '/skills', label: nav.skills },
      { path: '/projects', label: nav.projects },
      { path: '/contact', label: nav.contact },
    ];
  });
}
