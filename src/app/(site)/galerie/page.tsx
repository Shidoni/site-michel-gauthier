import { client } from '@/sanity/client'
import { QUERY_OEUVRES_ALL } from '@/sanity/queries'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import type { Oeuvre } from '@/types'

export const revalidate = 3600

export const metadata = {
  title: 'Galerie — Michel Gauthier',
}

export default async function GaleriePage() {
  let oeuvres: Oeuvre[] = []
  try {
    oeuvres = (await client.fetch<Oeuvre[]>(QUERY_OEUVRES_ALL)) || []
  } catch {
    // Sanity not yet configured
  }

  return <GalleryGrid oeuvres={oeuvres} />
}
