import { client } from '@/sanity/client'
import { QUERY_ARTICLES } from '@/sanity/queries'
import ArticlesList from '@/components/ArticlesList'
import type { Article } from '@/types'

export const revalidate = 3600

export const metadata = {
  title: 'Articles de presse — Michel Gauthier',
}

export default async function ArticlesDePressePage() {
  let articles: Article[] = []

  try {
    articles = await client.fetch<Article[]>(QUERY_ARTICLES)
  } catch {
    // Sanity not yet configured
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-serif text-4xl text-or font-light mb-8 pb-4 border-b border-or-dark">
        Articles de presse
      </h1>
      <ArticlesList articles={articles || []} />
    </div>
  )
}
