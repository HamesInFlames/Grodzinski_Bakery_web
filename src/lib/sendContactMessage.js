// src/lib/sendContactMessage.js
//
// Delivers contact-form submissions to the bakery inbox (info@grodzbakery.com)
// via Web3Forms — a hosted form-to-email service. No backend/server required:
// the browser POSTs the submission straight to Web3Forms, which emails it on.
//
// SETUP (one time):
//   1. Go to https://web3forms.com
//   2. Enter  info@grodzbakery.com  and click "Create Access Key".
//   3. Web3Forms emails an access key to that inbox — copy it.
//   4. Paste it below as ACCESS_KEY (or set VITE_WEB3FORMS_ACCESS_KEY in the
//      environment / Railway Variables to override without editing code).
//
// The access key is PUBLIC by design — it only permits sending to the inbox it
// was registered for, so it is safe to commit and ship in the frontend bundle.

const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Send a contact-form submission to the bakery inbox.
 *
 * @param {object} formState  Fields from ContactForm (name, email, phone,
 *                            location, details, message, botcheck).
 * @param {object} [opts]
 * @param {string} [opts.subject]  Email subject line (defaults per-page).
 * @returns {Promise<void>}  Resolves on success, throws on failure so the form
 *                           can show its error state.
 */
export async function sendContactMessage(formState, { subject } = {}) {
  // Honeypot: real users never fill this hidden field. If it's set, silently
  // pretend success so bots get no signal — and never bother the inbox.
  if (formState.botcheck) return;

  if (!ACCESS_KEY || ACCESS_KEY.startsWith("PASTE-")) {
    throw new Error(
      "Web3Forms access key is not configured. See src/lib/sendContactMessage.js."
    );
  }

  const payload = {
    access_key: ACCESS_KEY,
    subject: subject || "New message from the Grodzinski Bakery website",
    from_name: "Grodzinski Bakery Website",
    // Lets the bakery hit "Reply" and answer the customer directly.
    replyto: formState.email,
    name: formState.name,
    email: formState.email,
    phone: formState.phone || "—",
    "Preferred location": formState.location || "—",
    "Enquiry type": formState.details || "—",
    message: formState.message,
  };

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Submission failed. Please try again.");
  }
}
