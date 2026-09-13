import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const message = {
    name: 'Recruteur',
    email: 'recruteur@example.com',
    subject: 'Opportunité',
    message: 'Bonjour, je vous contacte au sujet d’un poste.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('posts the message to the /api/contact Cloudflare Pages Function', () => {
    const sendPromise = service.send(message);

    const request = httpMock.expectOne('/api/contact');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(message);

    request.flush({ ok: true });

    return expectAsync(sendPromise).toBeResolved();
  });

  it('rejects when the endpoint responds with an error', () => {
    const sendPromise = service.send(message);

    httpMock
      .expectOne('/api/contact')
      .flush({ error: 'send_failed' }, { status: 502, statusText: 'Bad Gateway' });

    return expectAsync(sendPromise).toBeRejected();
  });
});
