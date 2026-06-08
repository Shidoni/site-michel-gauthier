'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail, type ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 bg-or text-bordeaux-dark font-sans text-sm tracking-widest uppercase font-semibold rounded hover:bg-or-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Envoi en cours…' : 'Envoyer le message'}
    </button>
  )
}

export default function ContactForm() {
  const [state, action] = useFormState(sendContactEmail, initialState)

  if (state.status === 'success') {
    return (
      <div className="border border-or-dark rounded p-6 text-center">
        <p className="font-serif text-xl text-or mb-2">Message envoyé</p>
        <p className="font-sans text-sm text-creme/70">
          Merci pour votre message. Michel Gauthier vous répondra dans les meilleurs délais.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nom" className="block text-xs tracking-widest uppercase text-or-dark mb-2">
            Nom <span className="text-or">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-bordeaux border border-bordeaux-light rounded px-4 py-2.5 text-creme font-sans text-sm placeholder-creme/30 focus:outline-none focus:border-or transition-colors"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs tracking-widest uppercase text-or-dark mb-2">
            Email <span className="text-or">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-bordeaux border border-bordeaux-light rounded px-4 py-2.5 text-creme font-sans text-sm placeholder-creme/30 focus:outline-none focus:border-or transition-colors"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sujet" className="block text-xs tracking-widest uppercase text-or-dark mb-2">
          Sujet
        </label>
        <input
          id="sujet"
          name="sujet"
          type="text"
          autoComplete="off"
          className="w-full bg-bordeaux border border-bordeaux-light rounded px-4 py-2.5 text-creme font-sans text-sm placeholder-creme/30 focus:outline-none focus:border-or transition-colors"
          placeholder="Objet de votre message"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs tracking-widest uppercase text-or-dark mb-2">
          Message <span className="text-or">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full bg-bordeaux border border-bordeaux-light rounded px-4 py-2.5 text-creme font-sans text-sm placeholder-creme/30 focus:outline-none focus:border-or transition-colors resize-none"
          placeholder="Votre message…"
        />
      </div>

      {state.status === 'error' && (
        <p className="text-sm font-sans text-red-400 bg-red-950/30 border border-red-900 rounded px-4 py-2.5">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
