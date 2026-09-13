/**
 * Handles POST /api/contact — relays the portfolio's contact form to EmailJS from the server
 * side, so the EmailJS service/template IDs and keys never ship in the browser bundle. This is
 * what makes the integration safe on EmailJS's free tier: there is nothing in client-side JS for
 * a bot to scrape and replay from another site, which is exactly what the paid "allowed origins"
 * feature would otherwise be protecting against.
 *
 * Configure EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID and EMAILJS_PUBLIC_KEY as Worker secrets
 * (`wrangler secret put <NAME>` — dashboard "Variables and secrets" panels have proven unreliable
 * for this project's Workers Builds setup, so prefer the CLI). EMAILJS_PRIVATE_KEY is also
 * required here: this EmailJS account has "non-browser API access" enabled, which EmailJS only
 * allows when a request carries the Private Key ("Account → Security" in the EmailJS dashboard).
 */

export interface ContactEnv {
  readonly EMAILJS_SERVICE_ID: string;
  readonly EMAILJS_TEMPLATE_ID: string;
  readonly EMAILJS_PUBLIC_KEY: string;
  readonly EMAILJS_PRIVATE_KEY: string;
}

interface ContactPayload {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

/** Mirrors the Angular reactive form's own validators, since this endpoint can be called directly. */
function validationError(payload: Partial<ContactPayload>): string | null {
  if (!payload.name || payload.name.trim().length < 2 || payload.name.length > 80) {
    return 'invalid_name';
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    return 'invalid_email';
  }
  if (!payload.subject || payload.subject.trim().length < 3 || payload.subject.length > 120) {
    return 'invalid_subject';
  }
  if (!payload.message || payload.message.trim().length < 20 || payload.message.length > 2000) {
    return 'invalid_message';
  }
  return null;
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  let payload: Partial<ContactPayload>;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const invalidField = validationError(payload);
  if (invalidField) {
    return Response.json({ error: invalidField }, { status: 400 });
  }

  if (
    !env.EMAILJS_SERVICE_ID ||
    !env.EMAILJS_TEMPLATE_ID ||
    !env.EMAILJS_PUBLIC_KEY ||
    !env.EMAILJS_PRIVATE_KEY
  ) {
    return Response.json({ error: 'server_not_configured' }, { status: 500 });
  }

  const emailjsResponse = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      accessToken: env.EMAILJS_PRIVATE_KEY,
      template_params: {
        from_name: payload.name!.trim(),
        from_email: payload.email!.trim(),
        subject: payload.subject!.trim(),
        message: payload.message!.trim(),
      },
    }),
  });

  if (!emailjsResponse.ok) {
    return Response.json({ error: 'send_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
