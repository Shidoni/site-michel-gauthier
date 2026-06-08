import type { Article } from '@/types'

interface ArticlesListProps {
  articles: Article[]
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <p className="text-creme/60 italic font-sans text-sm">
        Aucun article pour le moment.
      </p>
    )
  }

  return (
    <ul className="space-y-6">
      {articles.map((article) => (
        <li
          key={article._id}
          className="border border-bordeaux-light rounded p-5 hover:border-or-dark transition-colors"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="font-serif text-xl text-or font-light leading-snug">
                {article.titre}
              </h2>
              <p className="font-sans text-sm text-creme/70 mt-1">
                {article.publication}
                {article.date && (
                  <span className="ml-3 text-creme/50">
                    {formatDate(article.date)}
                  </span>
                )}
              </p>
            </div>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-1.5 border border-or text-or text-xs font-sans tracking-widest uppercase hover:bg-or hover:text-bordeaux-dark transition-colors rounded"
              >
                Lire l&apos;article
              </a>
            )}
          </div>
          {article.description && (
            <p className="mt-3 font-sans text-sm text-creme/80 leading-relaxed italic">
              &ldquo;{article.description}&rdquo;
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}
