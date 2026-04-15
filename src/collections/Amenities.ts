import type { CollectionConfig } from 'payload'

export const Amenities: CollectionConfig = {
  slug: 'amenities',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'icon', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'video', type: 'upload', relationTo: 'media' },
    { name: 'isSharedAmenity', type: 'checkbox' },
    { name: 'capacity', type: 'number' },
    { name: 'capacityDetails', type: 'json' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'files', type: 'upload', relationTo: 'media', hasMany: true },
  ],
}