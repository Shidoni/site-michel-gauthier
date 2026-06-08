import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'michel-gauthier',
  title: 'Site Michel Gauthier',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Présentation artiste')
              .id('artiste')
              .child(
                S.document()
                  .schemaType('artiste')
                  .documentId('artiste')
              ),
            S.divider(),
            S.documentTypeListItem('oeuvre').title('Œuvres'),
            S.divider(),
            S.documentTypeListItem('exposition').title('Expositions'),
            S.documentTypeListItem('distinction').title('Distinctions'),
            S.documentTypeListItem('article').title('Articles de presse'),
            S.divider(),
            S.listItem()
              .title('Contact')
              .id('contact')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact')
              ),
          ]),
    }),
    visionTool(),
    frFRLocale(),
  ],
  schema: { types: schemaTypes },
})
