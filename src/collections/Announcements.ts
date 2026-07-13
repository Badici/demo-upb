import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: 'Anunț',
    plural: 'Anunțuri',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'endDate', 'updatedAt'],
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
        description: 'Folosit pentru accesibilitate și identificare în admin.',
      },
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine banner',
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'internal',
          label: 'Tip link',
          options: [
            { label: 'Intern', value: 'internal' },
            { label: 'Extern', value: 'external' },
          ],
        },
        {
          name: 'internalPath',
          type: 'text',
          label: 'Cale internă',
          admin: {
            description: 'Ex: /ro/admitere',
            condition: (_, siblingData) => siblingData?.type === 'internal',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'URL extern',
          admin: {
            description: 'Ex: https://upb.ro',
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Data de început',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      label: 'Data de sfârșit',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
