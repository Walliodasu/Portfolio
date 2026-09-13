import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CompanyLogo as CompanyLogoData } from '../../../core/models/experience.model';

@Component({
  selector: 'pf-company-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <span
      class="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
      [style.width.px]="size()"
      [style.height.px]="size()"
      [style.padding.px]="padding()"
    >
      <img
        [ngSrc]="logo().src"
        [alt]="logo().alt"
        [width]="logo().width"
        [height]="logo().width"
        class="size-full object-contain"
      />
    </span>
  `,
  host: { class: 'inline-flex' },
})
export class CompanyLogo {
  readonly logo = input.required<CompanyLogoData>();
  readonly size = input(48);

  protected padding(): number {
    return Math.round(this.size() * 0.14);
  }
}
