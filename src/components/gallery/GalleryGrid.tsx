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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-light text-stone-900 mb-6">Galerie</h1>
          <SectionFilter
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="font-serif text-xl">Aucune œuvre dans cette section</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200">
            {filtered.map((oeuvre) => (
              <div key={oeuvre._id} className="bg-white">
                <ArtworkCard oeuvre={oeuvre} onClick={setSelectedOeuvre} />
              </div>
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
