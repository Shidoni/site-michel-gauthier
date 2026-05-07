import type { ExpositionsListProps } from '@/types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ExpositionItem({ titre, date, lieu }: { titre: string; date: string; lieu: string }) {
  return (
    <li className="py-5 border-b border-stone-100 last:border-0">
      <time className="text-xs tracking-widest uppercase text-stone-400 block mb-1">
        {formatDate(date)}
      </time>
      <p className="font-serif text-lg text-stone-900 font-light">{titre}</p>
      <p className="text-sm text-stone-500 mt-0.5">{lieu}</p>
    </li>
  )
}

export default function ExpositionsList({ aVenir, passees }: ExpositionsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h2 className="font-serif text-2xl font-light text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Expositions à venir
        </h2>
        {aVenir.length === 0 ? (
          <p className="text-stone-400 text-sm">Aucune exposition programmée</p>
        ) : (
          <ul>
            {aVenir.map((expo) => (
              <ExpositionItem key={expo._id} {...expo} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="font-serif text-2xl font-light text-stone-900 mb-6 pb-4 border-b border-stone-200">
          Expositions passées
        </h2>
        {passees.length === 0 ? (
          <p className="text-stone-400 text-sm">Aucune exposition enregistrée</p>
        ) : (
          <ul>
            {passees.map((expo) => (
              <ExpositionItem key={expo._id} {...expo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
