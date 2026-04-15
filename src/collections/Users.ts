import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    { name: 'name', type: 'text' },
    { name: 'phoneNumber', type: 'text', unique: true },
    { name: 'city', type: 'text' },
    { name: 'address', type: 'text' },
    { name: 'state', type: 'text' },
    { name: 'interestedIn', type: 'text' },
    { 
      name: 'budgetRange', 
      type: 'group',
      fields: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' }
      ]
    },
    { name: 'isVerified', type: 'checkbox' },
    {
      name: 'wishlist',
      type: 'relationship',
      relationTo: 'properties',
      hasMany: true,
    },
    { name: 'lastLoginAt', type: 'date' },
    { name: 'timeJoined', type: 'date' },
  ],
}
