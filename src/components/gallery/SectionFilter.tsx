'use client'

import type { SectionFilterProps, OeuvreSection } from '@/types'

const sections: Array<{ value: OeuvreSection | 'all'; label: string }> = [
  { value: 'all', label: 'Toutes' },
  { value: 'terre', label: 'Terre' },
  { value: 'neige', label: 'Neige' },
  { value: 'mer', label: 'Mer' },
]

export default function SectionFilter({ activeSection, onSectionChange }: SectionFilterProps) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {sections.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSectionChange(value)}
          className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
            activeSection === value
              ? 'bg-stone-900 text-white'
              : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
