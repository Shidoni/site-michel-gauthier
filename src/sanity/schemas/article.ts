import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article de presse',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'string',
      description: 'Nom du journal ou magazine',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de parution',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Extrait',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'url',
      title: 'Lien vers l\'article',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Date (récente d\'abord)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'publication',
    },
  },
})
