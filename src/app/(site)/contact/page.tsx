import { client } from '@/sanity/client'
import { QUERY_CONTACT } from '@/sanity/queries'
import ContactInfo from '@/components/ContactInfo'
import ContactForm from '@/components/ContactForm'
import type { Contact } from '@/types'

export const revalidate = 3600

export const metadata = {
  title: 'Contact — Michel Gauthier',
}

export default async function ContactPage() {
  let contact: Contact | null = null
  try {
    contact = await client.fetch<Contact>(QUERY_CONTACT)
  } catch {
    // Sanity not yet configured
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-serif text-4xl text-or font-light mb-8 pb-4 border-b border-or-dark">
        Contact
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <ContactInfo contact={contact} />
        </div>
        <div className="md:col-span-2">
          <h2 className="font-serif text-xl text-or font-light mb-6">Envoyer un message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
