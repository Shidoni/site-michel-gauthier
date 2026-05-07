// TypeScript contracts — Site Michel Gauthier
// Ces types définissent la forme des données retournées par les GROQ queries.
// À copier dans src/types/index.ts lors de l'implémentation.

// ─── Primitives partagées ───────────────────────────────────────────────────

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

// ─── Page Accueil ───────────────────────────────────────────────────────────

export interface Artiste {
  photo: SanityImage
  biographie: PortableTextBlock[]    // Sanity Block Content
}

// Type simplifié pour Portable Text (rich text Sanity)
export type PortableTextBlock = {
  _type: 'block'
  _key: string
  children: Array<{ _type: 'span'; text: string; marks?: string[] }>
  style?: string
}

// ─── Page Galerie ───────────────────────────────────────────────────────────

export type OeuvreSection = 'terre' | 'neige' | 'mer'

export interface Oeuvre {
  _id: string
  titre: string
  section: OeuvreSection
  description?: string             // Optionnel
  image: SanityImage
}

// ─── Page Expositions ───────────────────────────────────────────────────────

export interface Exposition {
  _id: string
  titre: string
  date: string                     // ISO date "YYYY-MM-DD"
  lieu: string
  // Pas de champ "type" — classé par date vs aujourd'hui dans la query
}

export interface Distinction {
  _id: string
  titre: string
  annee?: number                   // Optionnel
  description?: string             // Optionnel
}

// ─── Page Contact ───────────────────────────────────────────────────────────

export interface Contact {
  email: string
  telephone: string
}

// ─── Props des composants ────────────────────────────────────────────────────

// GalleryGrid
export interface GalleryGridProps {
  oeuvres: Oeuvre[]
  activeSection: OeuvreSection | 'all'
}

// SectionFilter
export interface SectionFilterProps {
  activeSection: OeuvreSection | 'all'
  onSectionChange: (section: OeuvreSection | 'all') => void
}

// ArtworkModal (lightbox)
export interface ArtworkModalProps {
  oeuvre: Oeuvre | null
  isOpen: boolean
  onClose: () => void
}

// ExpositionsList
export interface ExpositionsListProps {
  aVenir: Exposition[]
  passees: Exposition[]
}

// DistinctionsList
export interface DistinctionsListProps {
  distinctions: Distinction[]
}

// ContactInfo
export interface ContactInfoProps {
  contact: Contact | null
}
