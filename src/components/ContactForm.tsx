"use client"

import type { FormEvent } from 'react'

function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const company = String(formData.get('company') ?? '')
    const subject = String(formData.get('subject') ?? '')
    const message = String(formData.get('message') ?? '')
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:sales@dakarsoftware.com?subject=${encodeURIComponent(`[WorkAttend] ${subject}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field-row">
        <label>
          <span>Name</span>
          <input type="text" name="name" autoComplete="name" required />
        </label>
        <label>
          <span>Work email</span>
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>

      <div className="contact-field-row">
        <label>
          <span>Company</span>
          <input type="text" name="company" autoComplete="organization" />
        </label>
        <label>
          <span>Subject</span>
          <input type="text" name="subject" required />
        </label>
      </div>

      <label>
        <span>How can we help?</span>
        <textarea name="message" rows={5} required />
      </label>

      <label className="contact-consent">
        <input type="checkbox" required />
        <span>I accept the <a href="https://www.workattend.com/privacy-policy/">WorkAttend Privacy Policy</a>.</span>
      </label>

      <button type="submit">Send request</button>
      <p className="contact-form-note">Submitting opens your email application with the request ready to send.</p>
    </form>
  )
}

export default ContactForm
