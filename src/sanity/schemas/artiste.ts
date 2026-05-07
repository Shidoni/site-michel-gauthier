import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'artiste',
  title: 'Présentation artiste',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description de la photo pour l\'accessibilité',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'biographie',
      title: 'Biographie',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Présentation artiste' }
    },
  },
})
