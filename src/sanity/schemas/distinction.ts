import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'distinction',
  title: 'Distinction',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      validation: (Rule) =>
        Rule.integer().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'annee',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? String(subtitle) : '',
      }
    },
  },
})
