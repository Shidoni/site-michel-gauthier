import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlForImage } from '@/lib/imageUrl'
import type { Artiste } from '@/types'

export default function ArtistPresentation({ artiste }: { artiste: Artiste }) {
  const imageUrl = urlForImage(artiste.photo).width(800).height(1000).fit('crop').url()

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <Image
            src={imageUrl}
            alt={artiste.photo.alt || 'Michel Gauthier, artiste peintre'}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="lg:pt-8">
          <h1 className="font-serif text-4xl lg:text-5xl font-light text-stone-900 mb-2">
            Michel Gauthier
          </h1>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-10">
            Artiste peintre
          </p>
          <div className="prose prose-stone max-w-none font-sans text-stone-600 leading-relaxed space-y-4">
            <PortableText value={artiste.biographie} />
          </div>
        </div>
      </div>
    </section>
  )
}
