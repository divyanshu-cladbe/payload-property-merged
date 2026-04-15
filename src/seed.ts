/**
 * Payload CMS Seed Script
 * Creates realistic dummy data for Properties, Builders, Amenities, and Blogs.
 *
 * Usage:
 *   npm run seed
 */

import { getPayload } from 'payload'
import config from './payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...\n')

  // ------------------------------------------------------------------
  // 1. BUILDER
  // ------------------------------------------------------------------
  console.log('📦 Seeding builders...')

  const builder1 = await payload.create({
    collection: 'builders',
    data: {
      legalName: 'Prestige Group',
      bondName: 'Prestige',
      email: 'contact@prestigegroup.com',
      phoneNo: '+91-80-2535-5555',
      whatsAppNo: '+91-99001-00001',
      website: 'https://www.prestigeconstructions.com',
      rating: 4.5,
      tags: [{ tag: 'luxury' }, { tag: 'trusted' }],
      cladbeId: 'BUILDER-PG-001',
    },
  })

  const builder2 = await payload.create({
    collection: 'builders',
    data: {
      legalName: 'DLF Limited',
      bondName: 'DLF',
      email: 'contact@dlf.in',
      phoneNo: '+91-11-4200-0000',
      whatsAppNo: '+91-99002-00002',
      website: 'https://www.dlf.in',
      rating: 4.3,
      tags: [{ tag: 'premium' }, { tag: 'established' }],
      cladbeId: 'BUILDER-DLF-001',
    },
  })

  console.log('  ✅ Created 2 builders\n')

  // ------------------------------------------------------------------
  // 2. AMENITIES
  // ------------------------------------------------------------------
  console.log('🏊 Seeding amenities...')

  const amenityData = [
    { name: 'Swimming Pool', icon: '🏊' },
    { name: 'Gym & Fitness Center', icon: '💪' },
    { name: 'Children\'s Play Area', icon: '🛝' },
    { name: 'Clubhouse', icon: '🏛️' },
    { name: '24/7 Security', icon: '🔒' },
    { name: 'Power Backup', icon: '⚡' },
    { name: 'Parking', icon: '🅿️' },
    { name: 'Landscaped Garden', icon: '🌿' },
  ]

  const createdAmenities = await Promise.all(
    amenityData.map(a =>
      payload.create({ collection: 'amenities', data: { name: a.name, icon: a.icon } })
    )
  )
  console.log(`  ✅ Created ${createdAmenities.length} amenities\n`)

  // ------------------------------------------------------------------
  // 3. PROPERTIES
  // ------------------------------------------------------------------
  console.log('🏠 Seeding properties...')

  const propertiesData = [
    {
      title: 'Prestige Lakeside Habitat',
      summary: 'Premium waterfront apartments in the heart of Delhi NCR with panoramic lake views.',
      possessionStatus: 'ready',
      tagsType: 'residential',
      price: 8500000,
      minPrice: 7500000,
      maxPrice: 12000000,
      noOfUnits: 250,
      noOfTowers: 4,
      reraId: 'RERA-DL-2023-0041',
      targetCompletionDate: '2024-12-31T00:00:00.000Z',
      location: {
        address: 'Sector 115, Noida Expressway, Noida, Uttar Pradesh 201304',
        street: 'Sector 115',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '201304',
        region: 'Noida Expressway',
        lat: 28.5355,
        lng: 77.3910,
      },
      builder: builder1.id,
      tags: [{ tag: 'lake-view' }, { tag: 'premium' }, { tag: 'new-launch' }],
      boost: { isActive: true, priority: 1, boostType: 'featured', city: 'delhi', region: 'Noida Expressway' },
      units: [
        { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 80, superBuiltUpArea: 1050, carpetArea: 850 },
        { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 120, superBuiltUpArea: 1450, carpetArea: 1100 },
        { noOfRooms: 4, noOfWashrooms: 4, noOfBalconies: 2, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 50, superBuiltUpArea: 2100, carpetArea: 1650 },
      ],
      amenities: createdAmenities.slice(0, 5).map(a => ({ amenity: a.id })),
    },
    {
      title: 'DLF The Crest',
      summary: 'Ultra-luxury sky villas with world-class concierge services in Gurugram.',
      possessionStatus: 'ready',
      tagsType: 'residential',
      price: 25000000,
      minPrice: 20000000,
      maxPrice: 45000000,
      noOfUnits: 125,
      noOfTowers: 2,
      reraId: 'RERA-HR-2022-0187',
      targetCompletionDate: '2023-06-30T00:00:00.000Z',
      location: {
        address: 'DLF Phase 5, Gurugram, Haryana 122009',
        street: 'DLF Phase 5',
        city: 'Delhi',
        state: 'Haryana',
        pincode: '122009',
        region: 'Gurugram',
        lat: 28.4595,
        lng: 77.0266,
      },
      builder: builder2.id,
      tags: [{ tag: 'ultra-luxury' }, { tag: 'sky-villa' }],
      boost: { isActive: true, priority: 2, boostType: 'sponsored', city: 'delhi', region: 'Gurugram' },
      units: [
        { noOfRooms: 4, noOfWashrooms: 4, noOfBalconies: 3, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 75, superBuiltUpArea: 4200, carpetArea: 3400 },
        { noOfRooms: 5, noOfWashrooms: 5, noOfBalconies: 4, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 50, superBuiltUpArea: 6500, carpetArea: 5200 },
      ],
      amenities: createdAmenities.map(a => ({ amenity: a.id })),
    },
    {
      title: 'Prestige City Indiranagar',
      summary: 'Modern 2 & 3 BHK apartments in the most connected neighbourhood of Delhi.',
      possessionStatus: 'under-construction',
      tagsType: 'residential',
      price: 5800000,
      minPrice: 4200000,
      maxPrice: 8700000,
      noOfUnits: 480,
      noOfTowers: 8,
      reraId: 'RERA-DL-2024-0078',
      targetCompletionDate: '2026-03-31T00:00:00.000Z',
      location: {
        address: 'Dwarka Expressway, Sector 99, Gurugram, Haryana 122505',
        street: 'Dwarka Expressway',
        city: 'Delhi',
        state: 'Haryana',
        pincode: '122505',
        region: 'Dwarka Expressway',
        lat: 28.5921,
        lng: 77.0398,
      },
      builder: builder1.id,
      tags: [{ tag: 'affordable' }, { tag: 'under-construction' }, { tag: 'new-launch' }],
      boost: { isActive: false, priority: 0, boostType: 'featured', city: 'delhi', region: 'Dwarka Expressway' },
      units: [
        { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 280, superBuiltUpArea: 980, carpetArea: 760 },
        { noOfRooms: 3, noOfWashrooms: 2, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 200, superBuiltUpArea: 1280, carpetArea: 980 },
      ],
      amenities: createdAmenities.slice(0, 6).map(a => ({ amenity: a.id })),
    },
    {
      title: 'Emaar Palm Heights',
      summary: 'Signature high-rise residences with iconic skyline views near IGI Airport.',
      possessionStatus: 'ready',
      tagsType: 'residential',
      price: 11500000,
      minPrice: 9000000,
      maxPrice: 18000000,
      noOfUnits: 320,
      noOfTowers: 5,
      reraId: 'RERA-DL-2021-0334',
      targetCompletionDate: '2023-12-31T00:00:00.000Z',
      location: {
        address: 'Sector 62, Gurugram, Haryana 122011',
        street: 'Sector 62',
        city: 'Delhi',
        state: 'Haryana',
        pincode: '122011',
        region: 'Golf Course Road',
        lat: 28.4314,
        lng: 77.0843,
      },
      builder: builder2.id,
      tags: [{ tag: 'high-rise' }, { tag: 'golf-course-view' }],
      boost: { isActive: true, priority: 3, boostType: 'trending', city: 'delhi', region: 'Golf Course Road' },
      units: [
        { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 180, superBuiltUpArea: 1800, carpetArea: 1400 },
        { noOfRooms: 4, noOfWashrooms: 3, noOfBalconies: 3, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 140, superBuiltUpArea: 2600, carpetArea: 2000 },
      ],
      amenities: createdAmenities.map(a => ({ amenity: a.id })),
    },
    {
      title: 'Sobha City',
      summary: 'Integrated township with premium apartments, villas and retail spaces.',
      possessionStatus: 'under-construction',
      tagsType: 'residential',
      price: 6900000,
      minPrice: 5500000,
      maxPrice: 11000000,
      noOfUnits: 650,
      noOfTowers: 10,
      reraId: 'RERA-DL-2024-0155',
      targetCompletionDate: '2027-06-30T00:00:00.000Z',
      location: {
        address: 'Sector 108, Dwarka Expressway, Gurugram, Haryana 122017',
        street: 'Sector 108',
        city: 'Delhi',
        state: 'Haryana',
        pincode: '122017',
        region: 'Dwarka Expressway',
        lat: 28.5561,
        lng: 77.0514,
      },
      builder: builder1.id,
      tags: [{ tag: 'township' }, { tag: 'integrated' }],
      boost: { isActive: false, priority: 0, boostType: 'featured', city: 'delhi', region: 'Dwarka Expressway' },
      units: [
        { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 300, superBuiltUpArea: 1020, carpetArea: 800 },
        { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 250, superBuiltUpArea: 1380, carpetArea: 1050 },
        { noOfRooms: 4, noOfWashrooms: 4, noOfBalconies: 3, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 100, superBuiltUpArea: 2200, carpetArea: 1750 },
      ],
      amenities: createdAmenities.slice(1, 7).map(a => ({ amenity: a.id })),
    },
    {
      title: 'M3M Gold City',
      summary: 'Plotted development in sector 79, Gurugram — build your dream home on premium land.',
      possessionStatus: 'ready',
      tagsType: 'plot',
      price: 7500000,
      minPrice: 5000000,
      maxPrice: 15000000,
      noOfUnits: 200,
      noOfTowers: 0,
      reraId: 'RERA-HR-2023-0099',
      targetCompletionDate: '2024-01-31T00:00:00.000Z',
      location: {
        address: 'Sector 79, SPR Road, Gurugram, Haryana 122004',
        street: 'Sector 79',
        city: 'Delhi',
        state: 'Haryana',
        pincode: '122004',
        region: 'SPR Road',
        lat: 28.4008,
        lng: 76.9977,
      },
      builder: builder2.id,
      tags: [{ tag: 'plot' }, { tag: 'premium-location' }],
      boost: { isActive: true, priority: 5, boostType: 'featured', city: 'delhi', region: 'SPR Road' },
      units: [
        { noOfRooms: 0, noOfWashrooms: 0, noOfBalconies: 0, noOfLivingRooms: 0, noOfKitchens: 0, noOfUnits: 200, plotArea: 200 },
      ],
      amenities: createdAmenities.slice(2, 5).map(a => ({ amenity: a.id })),
    },
  ] as const

  for (const propData of propertiesData) {
    await payload.create({
      collection: 'properties',
      data: propData as any,
    })
    console.log(`  ✅ Created: ${propData.title}`)
  }

  console.log(`\n  ✅ Created ${propertiesData.length} properties\n`)

  // ------------------------------------------------------------------
  // 4. BLOGS
  // ------------------------------------------------------------------
  console.log('📝 Seeding blogs...')

  const blogsData = [
    {
      title: '10 Things to Check Before Buying Your First Home in Delhi NCR',
      slug: 'checklist-before-buying-home-delhi-ncr',
      category: 'home-buying',
      author: 'Priya Sharma',
      publishedDate: '2025-03-15T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      summary: 'From RERA registration to possession timelines — a complete checklist for first-time homebuyers in Delhi NCR.',
      readTime: 7,
      approval_status: 'approved',
      tags: [{ tag: 'first-home' }, { tag: 'delhi-ncr' }, { tag: 'checklist' }],
    },
    {
      title: 'Why Dwarka Expressway is the Hottest Real Estate Corridor of 2025',
      slug: 'dwarka-expressway-real-estate-2025',
      category: 'property.new',
      author: 'Rohit Malhotra',
      publishedDate: '2025-04-01T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
      summary: 'Infrastructure boom, Metro connectivity and competitive pricing — here\'s why investors are flocking to Dwarka Expressway.',
      readTime: 5,
      approval_status: 'approved',
      tags: [{ tag: 'dwarka-expressway' }, { tag: 'investment' }, { tag: 'infrastructure' }],
    },
    {
      title: 'RERA Explained: Your Rights as a Homebuyer',
      slug: 'rera-explained-homebuyer-rights',
      category: 'legal',
      author: 'Advocate Swati Jain',
      publishedDate: '2025-02-20T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
      summary: 'A comprehensive guide to understanding RERA and how it protects you from builder delays, hidden charges and fraud.',
      readTime: 9,
      approval_status: 'approved',
      tags: [{ tag: 'rera' }, { tag: 'legal' }, { tag: 'property-rights' }],
    },
    {
      title: 'Modern Interior Trends for Indian Apartments in 2025',
      slug: 'interior-design-trends-india-2025',
      category: 'interior',
      author: 'Neha Kapoor',
      publishedDate: '2025-03-28T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      summary: 'From japandi aesthetics to smart home integration — explore the top interior design trends transforming Indian homes.',
      readTime: 6,
      approval_status: 'approved',
      tags: [{ tag: 'interior' }, { tag: 'design' }, { tag: 'smart-home' }],
    },
    {
      title: 'Pre-Launch vs Ready-to-Move: Which is Better for You?',
      slug: 'pre-launch-vs-ready-to-move-property',
      category: 'both',
      author: 'Arjun Mehta',
      publishedDate: '2025-04-05T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800',
      summary: 'Weighing the pros and cons of investing in pre-launch projects versus ready-to-move properties in India\'s current market.',
      readTime: 8,
      approval_status: 'approved',
      tags: [{ tag: 'investment' }, { tag: 'pre-launch' }, { tag: 'ready-to-move' }],
    },
    {
      title: 'How Estate IQ Scores Help You Pick the Right Property',
      slug: 'estate-iq-property-scoring-guide',
      category: 'property.new',
      author: 'Property.new Team',
      publishedDate: '2025-04-10T00:00:00.000Z',
      coverImageUrl: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800',
      summary: 'Our proprietary Estate IQ scoring system analyses 50+ data points to rate a property\'s investment potential — here\'s how to use it.',
      readTime: 4,
      approval_status: 'approved',
      tags: [{ tag: 'estate-iq' }, { tag: 'data-driven' }, { tag: 'technology' }],
    },
  ]

  for (const blogData of blogsData) {
    await payload.create({
      collection: 'blogs' as any,
      data: blogData as any,
    })
    console.log(`  ✅ Created blog: ${blogData.title}`)
  }

  console.log(`\n  ✅ Created ${blogsData.length} blogs\n`)

  // ------------------------------------------------------------------
  // Done
  // ------------------------------------------------------------------
  console.log('✨ Seed complete!\n')
  console.log('Summary:')
  console.log(`  - 2 Builders`)
  console.log(`  - ${createdAmenities.length} Amenities`)
  console.log(`  - ${propertiesData.length} Properties`)
  console.log(`  - ${blogsData.length} Blogs`)
  console.log('\nOpen the admin panel at http://localhost:3000/admin to view your data.\n')

  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
