import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            { name: 'title', type: 'text', required: true, index: true },
            { name: 'summary', type: 'textarea' },
            { name: 'description', type: 'richText' },
            { name: 'legalEntity', type: 'text' },
            { name: 'propertyBoundary', type: 'json' },
            {
              name: 'possessionStatus',
              type: 'select',
              options: ['ready', 'under-construction'],
              index: true,
            },
            {
              type: 'row',
              fields: [
                { name: 'propertySize', type: 'number' },
                { name: 'areaInSqmt', type: 'number' },
                { name: 'areaInSqft', type: 'number' },
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'noOfUnits', type: 'number' },
                { name: 'noOfTowers', type: 'number' },
              ]
            },
            {
              type: 'collapsible',
              label: 'Important Dates',
              fields: [
                { name: 'launchedOn', type: 'date' },
                { name: 'reraCompletionDate', type: 'date' },
                { name: 'targetCompletionDate', type: 'date' },
              ]
            },
            { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
            { name: 'tagsType', type: 'select', options: ['residential', 'commercial', 'plot'] },
            {
              name: 'similarPropertiesID',
              type: 'relationship',
              relationTo: 'properties',
              hasMany: true,
            }
          ],
        },
        {
          label: 'Location',
          fields: [
            { name: 'googlePlaceId', type: 'text' },
            {
              name: 'location',
              type: 'group',
              fields: [
                { name: 'address', type: 'text' },
                { name: 'street', type: 'text' },
                { name: 'city', type: 'text', index: true },
                { name: 'state', type: 'text', index: true },
                { name: 'pincode', type: 'text' },
                { name: 'region', type: 'text' },
                { name: 'lat', type: 'number' },
                { name: 'lng', type: 'number' },
              ],
            },
          ]
        },
        {
          label: 'Builder & Legal',
          fields: [
            {
              name: 'builder',
              type: 'relationship',
              relationTo: 'builders',
              index: true,
            },
            { name: 'reraId', type: 'text' },
            { name: 'reraLink', type: 'text' },
            {
              name: 'authorityApprovals',
              type: 'array',
              fields: [{ name: 'approval', type: 'text' }]
            },
            {
              name: 'authorityLink',
              type: 'array',
              fields: [{ name: 'link', type: 'text' }]
            },
          ]
        },
        {
          label: 'Pricing & Costing',
          fields: [
            { name: 'price', type: 'number', index: true },
            { name: 'minPrice', type: 'number', index: true },
            { name: 'maxPrice', type: 'number' },
          ]
        },
        {
           label: 'Media Details',
           fields: [
             { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'videos', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'files', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'approvalFile', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'projectPlan', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'blockPlan', type: 'upload', relationTo: 'media', hasMany: true },
             { name: 'brochureLimit', type: 'number' },
           ]
        },
        {
          label: 'Amenities',
          fields: [
            // AMENITIES (HYBRID)
            {
              name: 'amenities',
              type: 'array',
              fields: [
                {
                  name: 'amenity',
                  type: 'relationship',
                  relationTo: 'amenities',
                },
                { name: 'customName', type: 'text' },
                { name: 'customIcon', type: 'text' },
              ],
            },
          ]
        },
        {
          label: 'Units',
          description: 'Embedded representations of units, layout specifications and unit configurations for query performance.',
          fields: [
             {
               name: 'units',
               type: 'array',
               fields: [
                 {
                   type: 'row',
                   fields: [
                     { name: 'noOfRooms', type: 'number' },
                     { name: 'noOfWashrooms', type: 'number' },
                     { name: 'noOfBalconies', type: 'number' },
                   ]
                 },
                 {
                   type: 'row',
                   fields: [
                     { name: 'noOfLivingRooms', type: 'number' },
                     { name: 'noOfKitchens', type: 'number' },
                     { name: 'noOfUnits', type: 'number' },
                   ]
                 },
                 {
                   type: 'row',
                   fields: [
                     { name: 'plotArea', type: 'number' },
                     { name: 'superBuiltUpArea', type: 'number' },
                     { name: 'coveredArea', type: 'number' },
                     { name: 'carpetArea', type: 'number' },
                   ]
                 },
                 { name: 'front', type: 'select', options: ['east', 'west', 'north', 'south', 'north-east', 'north-west', 'south-east', 'south-west'] },
                 { name: 'cladbeModelId', type: 'text' },
                 { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
                 { name: 'videos', type: 'upload', relationTo: 'media', hasMany: true },
                 { name: 'threeDModels', type: 'upload', relationTo: 'media', hasMany: true },
                 { name: 'floorPlan', type: 'upload', relationTo: 'media', hasMany: true },
                 { name: 'vr', type: 'upload', relationTo: 'media', hasMany: true },
                 { name: 'walkthrough', type: 'upload', relationTo: 'media', hasMany: true },
                 {
                   name: 'configurations',
                   type: 'array',
                   fields: [
                     { name: 'category', type: 'text' },
                     { name: 'type', type: 'text' },
                     { name: 'config', type: 'json' },
                     { name: 'icon', type: 'text' },
                     { name: 'description', type: 'textarea' },
                     { name: 'tag', type: 'text' },
                     { name: 'files', type: 'upload', relationTo: 'media', hasMany: true },
                   ]
                 }
               ]
             }
          ]
        },
        {
          label: 'Nearby & Boosts',
          fields: [
            // NEARBY (EMBEDDED)
            {
              name: 'nearby',
              type: 'array',
              fields: [
                { name: 'category', type: 'text' },
                {
                  name: 'places',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text' },
                    { name: 'googlePlaceId', type: 'text' },
                    { name: 'address', type: 'text' },
                    { name: 'rating', type: 'number' },
                    { name: 'lat', type: 'number' },
                    { name: 'lng', type: 'number' },
                  ],
                },
              ],
            },
            // BOOST (EMBEDDED)
            {
              name: 'boost',
              type: 'group',
              fields: [
                { name: 'isActive', type: 'checkbox' },
                { name: 'priority', type: 'number', index: true },
                { name: 'boostType', type: 'select', options: ['featured', 'sponsored', 'trending'] },
                { name: 'startDate', type: 'date' },
                { name: 'endDate', type: 'date' },
                { name: 'city', type: 'text' },
                { name: 'region', type: 'text' },
              ],
            },
          ]
        }
      ]
    }
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        // Enforce the calculation rule for derived values if possible.
        // We leave this structure flexible so we don't break payload hooks.
        return data
      },
    ],
  },
}