export interface SanityImageAsset {
  _id: string
  url: string
  metadata: {
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export type PortableTextBlock = {
  _type: 'block'
  _key: string
  children: Array<{ _type: 'span'; text: string; marks?: string[] }>
  style?: string
}

export interface Artiste {
  photo: SanityImage
  biographie: PortableTextBlock[]
}

export type OeuvreSection = 'terre' | 'neige' | 'mer' | 'interieur'

export interface Oeuvre {
  _id: string
  titre: string
  section: OeuvreSection
  description?: string
  image: SanityImage
}

export interface Exposition {
  _id: string
  titre: string
  date: string
  lieu: string
}

export interface Distinction {
  _id: string
  titre: string
  annee?: number
  description?: string
}

export interface Contact {
  email: string
  telephone: string
}

export interface GalleryGridProps {
  oeuvres: Oeuvre[]
  activeSection: OeuvreSection | 'all'
}

export interface SectionFilterProps {
  activeSection: OeuvreSection | 'all'
  onSectionChange: (section: OeuvreSection | 'all') => void
}

export interface ArtworkModalProps {
  oeuvre: Oeuvre | null
  isOpen: boolean
  onClose: () => void
}

export interface ExpositionsListProps {
  aVenir: Exposition[]
  passees: Exposition[]
}

export interface DistinctionsListProps {
  distinctions: Distinction[]
}

export interface ContactInfoProps {
  contact: Contact | null
}
