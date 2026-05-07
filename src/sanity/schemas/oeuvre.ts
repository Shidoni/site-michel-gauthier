import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'oeuvre',
  title: 'Œuvre',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Terre', value: 'terre' },
          { title: 'Neige', value: 'neige' },
          { title: 'Mer', value: 'mer' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description de l\'œuvre pour l\'accessibilité',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'section',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = { terre: 'Terre', neige: 'Neige', mer: 'Mer' }
      return {
        title,
        subtitle: labels[subtitle] || subtitle,
        media,
      }
    },
  },
})
