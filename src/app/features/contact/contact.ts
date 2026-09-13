import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PROFILE } from '../../core/data/profile.data';
import { I18nService } from '../../core/services/i18n.service';
import { SeoService } from '../../core/services/seo.service';
import { Icon } from '../../shared/components/icon/icon';
import { PageGlow } from '../../shared/components/page-glow/page-glow';
import { SectionHeading } from '../../shared/components/section-heading/section-heading';
import { ContactService } from './services/contact.service';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'pf-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Icon, SectionHeading, PageGlow],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly contactService = inject(ContactService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly profile = PROFILE;
  protected readonly status = signal<SubmitStatus>('idle');

  protected readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
  });

  constructor() {
    effect(() => {
      const seo = this.i18n.t().seo;
      this.seo.update({
        title: seo.contactTitle,
        description: seo.contactDescription,
        path: '/contact',
      });
    });
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');

    try {
      await this.contactService.send(this.form.getRawValue());
      this.form.reset();
      this.status.set('success');
    } catch {
      this.status.set('error');
    }
  }

  protected errorMessage(control: AbstractControl): string | null {
    if (!control.touched || !control.errors) {
      return null;
    }

    const messages = this.i18n.t().contact.errors;

    if (control.errors['required']) {
      return messages.required;
    }
    if (control.errors['email']) {
      return messages.email;
    }
    if (control.errors['minlength']) {
      return messages.minlength;
    }
    if (control.errors['maxlength']) {
      return messages.maxlength;
    }

    return null;
  }
}
