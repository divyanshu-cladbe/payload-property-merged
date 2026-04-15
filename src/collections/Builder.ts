import type { CollectionConfig } from 'payload'

export const Builders: CollectionConfig = {
  slug: 'builders',
  fields: [
    { name: 'legalName', type: 'text', required: true },
    { name: 'bondName', type: 'text' },
    { name: 'email', type: 'email', unique: true },
    { name: 'phoneNo', type: 'text' },
    { name: 'whatsAppNo', type: 'text' },
    { name: 'website', type: 'text' },
    { name: 'vintage', type: 'date' },
    { name: 'rating', type: 'number' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'cladbeId', type: 'text', unique: true },
    { name: 'files', type: 'upload', relationTo: 'media', hasMany: true },
  ],
}