import type { CollectionConfig } from 'payload'

export const Faculties: CollectionConfig = {
  slug: 'faculties',
  labels: {
    singular: 'Facultate',
    plural: 'Facultăți',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['abbreviation', 'name', 'universityCenter', 'website', 'order'],
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
    },
    {
      name: 'abbreviation',
      type: 'text',
      required: true,
      label: 'Abreviere',
      admin: {
        description: 'Ex: FAC, FIIR, FAIMA',
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
      name: 'website',
      type: 'text',
      required: true,
      label: 'Site web',
      admin: {
        description: 'Ex: https://...',
      },
    },
    {
      name: 'universityCenter',
      type: 'select',
      required: true,
      label: 'Centru universitar',
      options: [
        { label: 'Centrul Universitar București', value: 'bucharest' },
        { label: 'Centrul Universitar Pitești', value: 'pitesti' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
      admin: {
        description: 'Ordinea de afișare în cadrul centrului universitar (crescător).',
      },
    },
  ],
}
