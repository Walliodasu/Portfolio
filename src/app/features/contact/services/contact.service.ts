import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

import { environment } from '../../../../environments/environment';

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly config = environment.emailjs;

  readonly isConfigured =
    Boolean(this.config.serviceId) &&
    Boolean(this.config.templateId) &&
    Boolean(this.config.publicKey);

  async send(message: ContactMessage): Promise<void> {
    if (!this.isConfigured) {
      throw new Error('EmailJS credentials are missing from the environment configuration.');
    }

    await emailjs.send(
      this.config.serviceId,
      this.config.templateId,
      {
        from_name: message.name,
        from_email: message.email,
        subject: message.subject,
        message: message.message,
      },
      { publicKey: this.config.publicKey },
    );
  }
}
