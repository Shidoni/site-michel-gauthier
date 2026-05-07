import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'exposition',
  title: 'Exposition',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      description: 'La classification passée/à venir est automatique selon cette date.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'date',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }
    },
  },
})
