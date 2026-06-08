import type { DistinctionsListProps } from '@/types'

export default function DistinctionsList({ distinctions }: DistinctionsListProps) {
  if (distinctions.length === 0) return null

  return (
    <div className="mt-14">
      <h2 className="font-serif text-2xl text-or font-light mb-4 pb-3 border-b border-or-dark">
        Distinctions
      </h2>
      <ul className="space-y-3">
        {distinctions.map((d) => (
          <li key={d._id} className="flex items-start gap-4 py-2 border-b border-bordeaux-light last:border-0">
            {d.annee && (
              <span className="text-or-dark text-sm font-sans w-12 flex-shrink-0 pt-0.5">
                {d.annee}
              </span>
            )}
            <div>
              <p className="font-serif text-lg text-creme font-light">{d.titre}</p>
              {d.description && (
                <p className="text-sm text-creme/60 mt-0.5">{d.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
