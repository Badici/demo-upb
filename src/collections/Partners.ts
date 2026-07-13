import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Afiliere internațională',
    plural: 'Afilieri internaționale',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'link', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nume',
      admin: {
        description: 'Numele organizației (folosit și ca text alternativ pentru logo).',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'link',
      type: 'text',
      required: false,
      label: 'Link (extern)',
      admin: {
        description: 'Opțional. Ex: https://...',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
      admin: {
        description: 'Ordinea de afișare (crescător).',
      },
    },
  ],
}
