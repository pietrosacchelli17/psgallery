"use client";
import { useState } from "react";

/**
 * MOCK FORM. Validates and shows a confirmation but sends nothing.
 * Wire `submit` to an API route / email service when the backend exists.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const bad: Record<string, string> = {};
    if (!String(d.get("name") ?? "").trim()) bad.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email") ?? ""))) bad.email = "Please enter a valid email address.";
    if (String(d.get("message") ?? "").trim().length < 10) bad.message = "Please add a few words about your enquiry.";
    setErrors(bad);
    if (!Object.keys(bad).length) setSent(true);
  }

  if (sent)
    return (
      <div role="status" className="border border-line bg-paper p-8">
        <p className="font-display text-3xl font-light">Thank you.</p>
        <p className="mt-3 max-w-[48ch] text-mute">
          This is a prototype form, so nothing has been sent. Once connected, your enquiry would reach Pietro directly.
        </p>
        <button type="button" onClick={() => setSent(false)} className="link-u mt-5 text-sm">Send another</button>
      </div>
    );

  const field = "mt-2 block w-full border border-line bg-cream px-4 py-3 text-base outline-none transition-colors focus:border-ink";
  const err = (id: string) => (errors[id] ? <p id={`${id}-err`} className="mt-1 text-sm text-[#9b3b2a]">{errors[id]}</p> : null);
  const inv = (id: string) => ({ "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `${id}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="space-y-6" aria-label="Contact form">
      <p className="inline-block border border-current px-2 py-0.5 text-[10px] font-normal uppercase tracking-[0.14em] text-mute">Prototype form: nothing is sent</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm">Name
          <input name="name" autoComplete="name" className={field} {...inv("name")} />
          {err("name")}
        </label>
        <label className="block text-sm">Email
          <input name="email" type="email" autoComplete="email" className={field} {...inv("email")} />
          {err("email")}
        </label>
      </div>
      <label className="block text-sm">Message
        <textarea name="message" rows={6} className={field} {...inv("message")} />
        {err("message")}
      </label>
      <button type="submit" className="bg-ink px-7 py-3.5 text-[0.78rem] font-normal uppercase tracking-[0.14em] text-cream transition-colors hover:bg-stone-deep">
        Send message
      </button>
    </form>
  );
}
