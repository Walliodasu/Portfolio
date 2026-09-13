import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

/**
 * Sends the contact form through /api/contact, a Cloudflare Pages Function that forwards to
 * EmailJS server-side — the EmailJS keys never reach the browser bundle.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  async send(message: ContactMessage): Promise<void> {
    await firstValueFrom(this.http.post('/api/contact', message));
  }
}
