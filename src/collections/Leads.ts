import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  fields: [
    { name: 'name', type: 'text' },
    { name: 'companyName', type: 'text' },
    { name: 'email', type: 'email', unique: true },
    { name: 'mobileNumber', type: 'text', unique: true },
    { name: 'category', type: 'select', options: ['general', 'sales', 'support', 'partnership'] },
    { name: 'otherCategory', type: 'text' },
    { name: 'isProcessed', type: 'checkbox' },
    { name: 'submittedAt', type: 'date' },
  ],
}