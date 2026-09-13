import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { I18nService } from '../../core/services/i18n.service';
import { Contact } from './contact';
import { ContactService } from './services/contact.service';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    contactService = jasmine.createSpyObj<ContactService>('ContactService', ['send']);

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ContactService, useValue: contactService },
      ],
    }).compileComponents();

    // The assertions below read French copy, so the locale must not leak in from another spec.
    TestBed.inject(I18nService).setLocale('fr');

    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
  });

  function submit(): HTMLFormElement {
    const form = (fixture.nativeElement as HTMLElement).querySelector('form')!;
    form.dispatchEvent(new Event('submit'));
    return form;
  }

  function fillValidForm(): void {
    const instance = fixture.componentInstance as unknown as {
      form: { setValue: (value: Record<string, string>) => void };
    };

    instance.form.setValue({
      name: 'Recruteur',
      email: 'recruteur@example.com',
      subject: 'Opportunité Angular',
      message: 'Bonjour, je vous contacte au sujet d’un poste de développeur Angular.',
    });
  }

  it('does not send anything while the form is invalid', async () => {
    submit();
    await fixture.whenStable();

    expect(contactService.send).not.toHaveBeenCalled();
  });

  it('displays validation errors once an invalid field has been touched', async () => {
    submit();
    await fixture.whenStable();
    fixture.detectChanges();

    const errors = (fixture.nativeElement as HTMLElement).querySelectorAll('p.text-red-500');

    expect(errors.length).toBeGreaterThan(0);
  });

  it('sends the message and reports success when the form is valid', async () => {
    contactService.send.and.resolveTo();
    fillValidForm();

    submit();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(contactService.send).toHaveBeenCalledTimes(1);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Message envoyé');
  });

  it('reports an error when sending fails', async () => {
    contactService.send.and.rejectWith(new Error('network'));
    fillValidForm();

    submit();
    await fixture.whenStable();
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('échoué');
  });
});
