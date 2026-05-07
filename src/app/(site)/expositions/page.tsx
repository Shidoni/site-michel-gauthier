import { client } from '@/sanity/client'
import {
  QUERY_EXPOSITIONS_A_VENIR,
  QUERY_EXPOSITIONS_PASSEES,
  QUERY_DISTINCTIONS,
} from '@/sanity/queries'
import ExpositionsList from '@/components/ExpositionsList'
import DistinctionsList from '@/components/DistinctionsList'
import type { Exposition, Distinction } from '@/types'

export const revalidate = 3600

export const metadata = {
  title: 'Expositions — Michel Gauthier',
}

export default async function ExpositionsPage() {
  const today = new Date().toISOString().split('T')[0]

  let aVenir: Exposition[] = []
  let passees: Exposition[] = []
  let distinctions: Distinction[] = []

  try {
    ;[aVenir, passees, distinctions] = await Promise.all([
      client.fetch<Exposition[]>(QUERY_EXPOSITIONS_A_VENIR, { today }),
      client.fetch<Exposition[]>(QUERY_EXPOSITIONS_PASSEES, { today }),
      client.fetch<Distinction[]>(QUERY_DISTINCTIONS),
    ])
  } catch {
    // Sanity not yet configured
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-4xl font-light text-stone-900 mb-12">Expositions</h1>
      <ExpositionsList aVenir={aVenir || []} passees={passees || []} />
      <DistinctionsList distinctions={distinctions || []} />
    </div>
  )
}
