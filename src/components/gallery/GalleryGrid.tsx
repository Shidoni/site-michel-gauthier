'use client'

import { useState, useMemo } from 'react'
import SectionFilter from './SectionFilter'
import ArtworkCard from './ArtworkCard'
import ArtworkModal from './ArtworkModal'
import type { Oeuvre, OeuvreSection } from '@/types'

export default function GalleryGrid({ oeuvres }: { oeuvres: Oeuvre[] }) {
  const [activeSection, setActiveSection] = useState<OeuvreSection | 'all'>('all')
  const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null)

  const filtered = useMemo(
    () =>
      activeSection === 'all'
        ? oeuvres
        : oeuvres.filter((o) => o.section === activeSection),
    [oeuvres, activeSection]
  )

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-or font-light mb-2">Galerie</h1>
          <div className="border-b border-bordeaux-light pb-6">
            <SectionFilter
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-or-dark">
            <p className="font-serif text-xl italic">Aucune œuvre dans cette section</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {filtered.map((oeuvre) => (
              <ArtworkCard key={oeuvre._id} oeuvre={oeuvre} onClick={setSelectedOeuvre} />
            ))}
          </div>
        )}
      </div>

      <ArtworkModal
        oeuvre={selectedOeuvre}
        isOpen={selectedOeuvre !== null}
        onClose={() => setSelectedOeuvre(null)}
      />
    </>
  )
}
