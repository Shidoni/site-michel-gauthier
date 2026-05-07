import type { ContactInfoProps } from '@/types'

export default function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <p className="text-stone-400">Les informations de contact ne sont pas disponibles.</p>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Email</p>
        <a
          href={`mailto:${contact.email}`}
          className="font-serif text-xl text-stone-900 hover:text-stone-600 transition-colors"
        >
          {contact.email}
        </a>
      </div>
      <div>
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Téléphone</p>
        <a
          href={`tel:${contact.telephone.replace(/\s/g, '')}`}
          className="font-serif text-xl text-stone-900 hover:text-stone-600 transition-colors"
        >
          {contact.telephone}
        </a>
      </div>
    </div>
  )
}
