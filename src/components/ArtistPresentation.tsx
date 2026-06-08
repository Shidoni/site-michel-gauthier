import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlForImage } from '@/lib/imageUrl'
import type { Artiste } from '@/types'

export default function ArtistPresentation({ artiste }: { artiste: Artiste }) {
  const imageUrl = urlForImage(artiste.photo).width(700).height(900).fit('crop').url()

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative aspect-[3/4] overflow-hidden border-2 border-bordeaux-light shadow-xl">
          <Image
            src={imageUrl}
            alt={artiste.photo.alt || 'Michel Gauthier, artiste peintre'}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="lg:pt-4">
          <h1 className="font-serif text-4xl text-or font-light mb-1">
            Michel Gauthier
          </h1>
          <p className="text-xs tracking-widest uppercase text-or-dark mb-8 border-b border-bordeaux-light pb-4">
            Artiste peintre
          </p>
          <div className="text-creme/90 leading-relaxed space-y-4 text-sm">
            <PortableText value={artiste.biographie} />
          </div>
        </div>
      </div>

      <blockquote className="mt-16 text-center border-t border-bordeaux-light pt-10">
        <p className="font-serif text-2xl text-or/80 italic leading-relaxed">
          « Les œuvres de Michel Gauthier ne parlent pas,
        </p>
        <p className="font-serif text-2xl text-or italic leading-relaxed mt-1">
          elles murmurent... »
        </p>
      </blockquote>
    </section>
  )
}
