import type { CollectionConfig } from 'payload'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Știre',
    plural: 'Știri',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titlu',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      label: 'Slug (URL)',
      admin: {
        position: 'sidebar',
        description: 'Se generează automat din titlu dacă e lăsat gol.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value)
            if (data?.title) return slugify(data.title)
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Rezumat',
      admin: {
        description: 'Text scurt afișat în listă și pe homepage.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine principală',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conținut',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categorie',
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'General', value: 'general' },
        { label: 'Admitere', value: 'admitere' },
        { label: 'Cercetare', value: 'cercetare' },
        { label: 'Evenimente', value: 'evenimente' },
        { label: 'Studenți', value: 'studenti' },
        { label: 'Parteneriate', value: 'parteneriate' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Data publicării',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
