import type { CollectionConfig } from 'payload'

export const EOI: CollectionConfig = {
  slug: 'expression-of-interest',
  fields: [
    {
      name: 'quotation',
      type: 'relationship',
      relationTo: 'quotations',
    },
    { name: 'status', type: 'select', options: ['pending', 'reviewed', 'accepted', 'rejected'] },
    { name: 'priority', type: 'select', options: ['low', 'medium', 'high'] },
    { name: 'interestedAmount', type: 'number' },
    { name: 'message', type: 'textarea' },
    { name: 'contactPreference', type: 'select', options: ['email', 'phone', 'whatsapp'] },
    { name: 'preferredContactTime', type: 'text' },
    { name: 'expectedDecisionDate', type: 'date' },
    { 
      name: 'budgetRange', 
      type: 'group',
      fields: [
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' }
      ]
    },
    { name: 'requirements', type: 'json' },
    { name: 'referenceNumber', type: 'text' },
    { name: 'ipAddress', type: 'text' },
    { name: 'followUpDate', type: 'date' },
    { name: 'followUpCount', type: 'number' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'metadata', type: 'json' },
    { name: 'expiresAt', type: 'date' },
    { name: 'isActive', type: 'checkbox' },
    { name: 'score', type: 'number' },
    { name: 'convertedAt', type: 'date' },
    { name: 'rejectionReason', type: 'textarea' },
  ],
}