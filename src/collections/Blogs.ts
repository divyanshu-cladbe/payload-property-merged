import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'author'],
    description: 'Blog posts and news articles shown on the website.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { description: 'URL-friendly identifier, e.g. "why-invest-in-delhi-2025"' } },
    {
      name: 'category',
      type: 'select',
      options: ['property.new', 'real-estate', 'home-buying', 'investment', 'interior', 'legal', 'both'],
      index: true,
    },
    { name: 'author', type: 'text' },
    { name: 'publishedDate', type: 'date', index: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'coverImageUrl', type: 'text', admin: { description: 'External image URL (fallback if no uploaded image)' } },
    { name: 'summary', type: 'textarea', admin: { description: 'Short preview text shown in blog cards' } },
    { name: 'content', type: 'richText' },
    { name: 'readTime', type: 'number', admin: { description: 'Estimated read time in minutes' } },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'approval_status', type: 'select', options: ['pending', 'approved', 'rejected'], defaultValue: 'approved' },
  ],
  timestamps: true,
}
