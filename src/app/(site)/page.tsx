import { client } from '@/sanity/client'
import { QUERY_ARTISTE } from '@/sanity/queries'
import ArtistPresentation from '@/components/ArtistPresentation'
import type { Artiste } from '@/types'

export const revalidate = 3600

export default async function HomePage() {
  let artiste: Artiste | null = null
  try {
    artiste = await client.fetch<Artiste>(QUERY_ARTISTE)
  } catch {
    // Sanity not yet configured
  }

  if (!artiste) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center text-stone-400">
        <p className="font-serif text-3xl font-light">Michel Gauthier</p>
        <p className="text-sm mt-4 tracking-wide">Artiste peintre</p>
      </div>
    )
  }

  return <ArtistPresentation artiste={artiste} />
}
