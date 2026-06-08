'use client'

import type { SectionFilterProps, OeuvreSection } from '@/types'

const sections: Array<{ value: OeuvreSection | 'all'; label: string }> = [
  { value: 'all',       label: 'Toutes' },
  { value: 'terre',     label: 'Terre' },
  { value: 'neige',     label: 'Neige' },
  { value: 'mer',       label: 'Mer' },
  { value: 'interieur', label: 'Intérieur' },
]

export default function SectionFilter({ activeSection, onSectionChange }: SectionFilterProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {sections.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSectionChange(value)}
          className={`px-6 py-2 rounded-full text-sm font-sans tracking-widest uppercase border transition-colors ${
            activeSection === value
              ? 'bg-or text-bordeaux-dark border-or font-semibold'
              : 'bg-transparent text-or border-or hover:bg-or hover:text-bordeaux-dark'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
