import type { ContactInfoProps } from '@/types'

export default function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <p className="text-creme/40 italic">Les informations de contact ne sont pas disponibles.</p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-bordeaux-light pb-6">
        <p className="text-xs tracking-widest uppercase text-or-dark mb-3">Email</p>
        <a
          href={`mailto:${contact.email}`}
          className="font-serif text-2xl text-creme hover:text-or transition-colors underline underline-offset-4 decoration-bordeaux-light hover:decoration-or"
        >
          {contact.email}
        </a>
      </div>
      <div>
        <p className="text-xs tracking-widest uppercase text-or-dark mb-3">Téléphone</p>
        <a
          href={`tel:${contact.telephone.replace(/\s/g, '')}`}
          className="font-serif text-2xl text-creme hover:text-or transition-colors"
        >
          {contact.telephone}
        </a>
      </div>
    </div>
  )
}
