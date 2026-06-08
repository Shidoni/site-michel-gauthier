'use server'

import { Resend } from 'resend'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const nom = (formData.get('nom') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const sujet = (formData.get('sujet') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!nom || !email || !message) {
    return { status: 'error', message: 'Veuillez remplir tous les champs obligatoires.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Adresse email invalide.' }
  }

  const apiKey = process.env.RESEND_API_KEY
  const destination = process.env.CONTACT_EMAIL

  if (!apiKey || !destination) {
    return { status: 'error', message: 'Le service de messagerie n\'est pas encore configuré.' }
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Formulaire contact <contact@michelgauthier-jorrand.fr>',
      to: destination,
      replyTo: email,
      subject: sujet ? `[Contact] ${sujet}` : `[Contact] Message de ${nom}`,
      text: `Nom : ${nom}\nEmail : ${email}\n\n${message}`,
      html: `
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr />
        <p style="white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
      `,
    })

    return { status: 'success' }
  } catch {
    return { status: 'error', message: 'Une erreur est survenue lors de l\'envoi. Réessayez ou contactez directement par email.' }
  }
}
