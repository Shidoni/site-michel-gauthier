import Image from 'next/image'
import { urlForImage } from '@/lib/imageUrl'
import type { Oeuvre } from '@/types'

interface ArtworkCardProps {
  oeuvre: Oeuvre
  onClick: (oeuvre: Oeuvre) => void
}

export default function ArtworkCard({ oeuvre, onClick }: ArtworkCardProps) {
  const imageUrl = urlForImage(oeuvre.image).width(600).height(600).fit('crop').url()

  return (
    <button
      onClick={() => onClick(oeuvre)}
      className="group relative aspect-square overflow-hidden bg-stone-100 block w-full"
      aria-label={`Voir ${oeuvre.titre}`}
    >
      <Image
        src={imageUrl}
        alt={oeuvre.image.alt || oeuvre.titre}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-serif text-white text-lg font-light">{oeuvre.titre}</p>
        </div>
      </div>
    </button>
  )
}
