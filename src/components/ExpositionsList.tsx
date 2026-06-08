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
    <li className="py-4 border-b border-bordeaux-light last:border-0">
      <time className="text-xs tracking-widest uppercase text-or-dark block mb-1">
        {formatDate(date)}
      </time>
      <p className="font-serif text-lg text-creme font-light">{titre}</p>
      <p className="text-sm text-creme/60 mt-0.5">{lieu}</p>
    </li>
  )
}

export default function ExpositionsList({ aVenir, passees }: ExpositionsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="font-serif text-2xl text-or font-light mb-4 pb-3 border-b border-or-dark">
          Expositions à venir
        </h2>
        {aVenir.length === 0 ? (
          <p className="text-creme/40 text-sm italic">Aucune exposition programmée</p>
        ) : (
          <ul>
            {aVenir.map((expo) => (
              <ExpositionItem key={expo._id} {...expo} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="font-serif text-2xl text-or font-light mb-4 pb-3 border-b border-or-dark">
          Expositions passées
        </h2>
        {passees.length === 0 ? (
          <p className="text-creme/40 text-sm italic">Aucune exposition enregistrée</p>
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
