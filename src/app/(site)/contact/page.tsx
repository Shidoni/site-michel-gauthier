import { client } from '@/sanity/client'
import { QUERY_CONTACT } from '@/sanity/queries'
import ContactInfo from '@/components/ContactInfo'
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="max-w-md">
        <h1 className="font-serif text-4xl font-light text-stone-900 mb-12">Contact</h1>
        <ContactInfo contact={contact} />
      </div>
    </div>
  )
}
