import type { CollectionConfig } from 'payload'

export const Quotations: CollectionConfig = {
  slug: 'quotations',
  fields: [
    { name: 'quotationNumber', type: 'text', unique: true },
    {
      name: 'property',
      type: 'relationship',
      relationTo: 'properties',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'type', type: 'select', options: ['standard', 'custom', 'premium'] },
    { name: 'baseAmount', type: 'number' },
    { name: 'taxAmount', type: 'number' },
    { name: 'discountAmount', type: 'number' },
    { name: 'totalAmount', type: 'number' },
    { name: 'status', type: 'select', options: ['pending', 'accepted', 'rejected'] },
    { name: 'validFrom', type: 'date' },
    { name: 'validUntil', type: 'date' },
  ],
}