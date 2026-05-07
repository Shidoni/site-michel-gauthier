import type { DistinctionsListProps } from '@/types'

export default function DistinctionsList({ distinctions }: DistinctionsListProps) {
  if (distinctions.length === 0) return null

  return (
    <div className="mt-20">
      <h2 className="font-serif text-2xl font-light text-stone-900 mb-6 pb-4 border-b border-stone-200">
        Distinctions
      </h2>
      <ul className="space-y-4">
        {distinctions.map((d) => (
          <li key={d._id} className="flex items-start gap-4">
            {d.annee && (
              <span className="text-xs tracking-widest text-stone-400 pt-1 w-12 flex-shrink-0">
                {d.annee}
              </span>
            )}
            <div>
              <p className="font-serif text-lg text-stone-900 font-light">{d.titre}</p>
              {d.description && (
                <p className="text-sm text-stone-500 mt-0.5">{d.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
