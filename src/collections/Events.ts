import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Eveniment',
    plural: 'Evenimente',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'link', 'updatedAt'],
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
      admin: {
        description: 'Folosit pentru accesibilitate (text alternativ).',
      },
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Banner eveniment',
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      label: 'Link (extern)',
      admin: {
        description: 'Ex: https://...',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
      label: 'Data evenimentului',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
