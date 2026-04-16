import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Download an image from URL and return its local path
const downloadImage = (url: string, destPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve(destPath)
      })
    }).on('error', (err) => {
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting full comprehensive seed...\n')

  // Prepare a temporary directory for dummy images
  const tempDir = path.join(dirname, 'temp_seed_images')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }

  try {
    console.log('🖼️ Downloading placeholder images...')
    // Download 3 placeholder images
    const img1Path = await downloadImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', path.join(tempDir, 'prop1.jpg'))
    const img2Path = await downloadImage('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', path.join(tempDir, 'prop2.jpg'))
    const img3Path = await downloadImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', path.join(tempDir, 'prop3.jpg'))

    console.log('🖼️ Creating media records...')
    const media1 = await payload.create({ collection: 'media', data: { alt: 'Property Exterior' }, filePath: img1Path })
    const media2 = await payload.create({ collection: 'media', data: { alt: 'Property Interior' }, filePath: img2Path })
    const media3 = await payload.create({ collection: 'media', data: { alt: 'Property Landscape' }, filePath: img3Path })

    const primaryImages = [media1.id, media2.id, media3.id]
    console.log('  ✅ Created media\n')

    // ------------------------------------------------------------------
    // BUILDERS
    // ------------------------------------------------------------------
    console.log('📦 Seeding builders...')
    const builder1 = await payload.create({
      collection: 'builders',
      data: {
        legalName: 'Prestige Group', bondName: 'Prestige', email: 'contact@prestige.com',
        phoneNo: '+91-80-2535-5555', whatsAppNo: '+91-99001-00001', rating: 4.8, about: 'Premium builder in South India.', summary: 'Famous properties.',
      },
    })
    const builder2 = await payload.create({
      collection: 'builders',
      data: {
        legalName: 'Godrej Properties', bondName: 'Godrej', email: 'hello@godrej.com',
        phoneNo: '+91-11-4200-0000', whatsAppNo: '+91-99002-00002', rating: 4.5, about: 'Legacy builder across India.', summary: 'Luxurious properties.',
      },
    })
    console.log('  ✅ Created 2 builders\n')

    // ------------------------------------------------------------------
    // AMENITIES
    // ------------------------------------------------------------------
    console.log('🏊 Seeding amenities...')
    const amenityData = [
      { name: 'Swimming Pool', icon: '🏊' }, { name: 'Gymnasium', icon: '💪' },
      { name: 'Kids Play Area', icon: '🛝' }, { name: 'Clubhouse', icon: '🏛️' },
      { name: '24/7 Security', icon: '🔒' }, { name: 'Power Backup', icon: '⚡' },
      { name: 'Visitor Parking', icon: '🅿️' }, { name: 'Landscaped Garden', icon: '🌿' },
      { name: 'Tennis Court', icon: '🎾' }, { name: 'Jogging Track', icon: '🏃' }
    ]
    const createdAmenities = await Promise.all(
      amenityData.map(a => payload.create({ collection: 'amenities', data: { name: a.name, icon: a.icon, description: a.name } }))
    )
    console.log(`  ✅ Created ${createdAmenities.length} amenities\n`)

    // Helper functions for mock data
    const getAmenities = (count: number) => createdAmenities.slice(0, count).map(a => ({ amenity: a.id, customName: a.name }))
    const getImages = () => primaryImages.map(id => id)

    // ------------------------------------------------------------------
    // PROPERTIES (Covering Delhi, Mumbai, Bangalore, Pune)
    // ------------------------------------------------------------------
    console.log('🏠 Seeding properties across cities...')

    const propertiesData = [
      // DELHI 1
      {
        title: 'Prestige Lakeside Habitat Delhi',
        summary: 'Premium waterfront apartments in the heart of Delhi NCR.',
        description: '<p>Experience ultra luxury living connected to major corporate hubs.</p>',
        possessionStatus: 'ready', tagsType: 'residential',
        price: 8500000, minPrice: 7500000, maxPrice: 12000000,
        areaInSqft: 1450, noOfUnits: 250, noOfTowers: 4, reraId: 'RERA-DL-2023-0041',
        launchedOn: '2021-01-01T00:00:00.000Z', targetCompletionDate: '2024-12-31T00:00:00.000Z',
        location: { address: 'Sector 115, Noida Expressway', street: 'Sector 115', city: 'Delhi', state: 'Delhi', pincode: '201304', region: 'Noida Expressway', lat: 28.5355, lng: 77.3910 },
        builder: builder1.id, tags: [{ tag: 'lake-view' }, { tag: 'premium' }],
        images: getImages(),
        amenities: getAmenities(8),
        units: [
          { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 80, superBuiltUpArea: 1050, carpetArea: 850, _id: 'u1' },
          { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 120, superBuiltUpArea: 1450, carpetArea: 1100, _id: 'u2' },
        ],
        nearby: [
          { category: 'Hospitals', places: [{ name: 'Max Hospital', address: 'Noida', rating: 4.5, lat: 28.53, lng: 77.38 }] }
        ]
      },
      // DELHI 2
      {
        title: 'Godrej South Estate',
        summary: 'Copper clad towers defining the skyline of South Delhi.',
        possessionStatus: 'under-construction', tagsType: 'residential',
        price: 25000000, minPrice: 20000000, maxPrice: 45000000,
        areaInSqft: 2500, noOfUnits: 125, noOfTowers: 2, reraId: 'RERA-DL-2022-0187',
        targetCompletionDate: '2026-06-30T00:00:00.000Z',
        location: { address: 'Okhla Phase 1', street: 'Okhla', city: 'Delhi', state: 'Delhi', pincode: '110020', region: 'South Delhi', lat: 28.5273, lng: 77.2797 },
        builder: builder2.id, tags: [{ tag: 'ultra-luxury' }],
        images: getImages(),
        amenities: getAmenities(10),
        units: [
          { noOfRooms: 4, noOfWashrooms: 4, noOfBalconies: 3, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 75, superBuiltUpArea: 4200, carpetArea: 3400, _id: 'u3' },
        ],
        nearby: [
          { category: 'Metro', places: [{ name: 'Okhla Metro', address: 'Delhi', rating: 4.0, lat: 28.53, lng: 77.27 }] }
        ]
      },
      // MUMBAI 1
      {
        title: 'Lodha World One',
        summary: 'Iconic skyscraper offering bespoke residences.',
        possessionStatus: 'ready', tagsType: 'residential',
        price: 55000000, minPrice: 50000000, maxPrice: 120000000,
        areaInSqft: 3500, noOfUnits: 300, noOfTowers: 3, reraId: 'RERA-MH-2021-0001',
        targetCompletionDate: '2022-12-31T00:00:00.000Z',
        location: { address: 'Lower Parel', street: 'Tulsi Pipe Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400013', region: 'South Mumbai', lat: 18.9953, lng: 72.8276 },
        builder: builder1.id, tags: [{ tag: 'skyscraper' }, { tag: 'sea-view' }],
        images: getImages(),
        amenities: getAmenities(7),
        units: [
          { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 150, superBuiltUpArea: 2100, carpetArea: 1500, _id: 'u4' },
          { noOfRooms: 4, noOfWashrooms: 4, noOfBalconies: 3, noOfLivingRooms: 2, noOfKitchens: 1, noOfUnits: 100, superBuiltUpArea: 3200, carpetArea: 2500, _id: 'u5' },
        ],
        nearby: [
          { category: 'Malls', places: [{ name: 'High Street Phoenix', address: 'Lower Parel', rating: 4.8, lat: 18.99, lng: 72.82 }] }
        ]
      },
      // MUMBAI 2
      {
        title: 'Godrej The Trees',
        summary: 'Integrated township preserving historic trees.',
        possessionStatus: 'ready', tagsType: 'residential',
        price: 28000000, minPrice: 25000000, maxPrice: 40000000,
        areaInSqft: 1800, noOfUnits: 800, noOfTowers: 15, reraId: 'RERA-MH-2020-0089',
        targetCompletionDate: '2023-05-01T00:00:00.000Z',
        location: { address: 'Vikhroli East', street: 'Eastern Express Hwy', city: 'Mumbai', state: 'Maharashtra', pincode: '400079', region: 'Central Suburbs', lat: 19.1030, lng: 72.9295 },
        builder: builder2.id, tags: [{ tag: 'township' }, { tag: 'green-living' }],
        images: getImages(),
        amenities: getAmenities(8),
        units: [
          { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 400, superBuiltUpArea: 1200, carpetArea: 800, _id: 'u6' },
        ]
      },
      // BANGALORE 1
      {
        title: 'Prestige Shantiniketan',
        summary: 'Massive residential and commercial township in Whitefield.',
        possessionStatus: 'ready', tagsType: 'residential',
        price: 15000000, minPrice: 12000000, maxPrice: 22000000,
        areaInSqft: 1600, noOfUnits: 3000, noOfTowers: 24, reraId: 'RERA-KA-2019-1002',
        targetCompletionDate: '2021-08-15T00:00:00.000Z',
        location: { address: 'Whitefield', street: 'ITPL Main Road', city: 'Bangalore', state: 'Karnataka', pincode: '560048', region: 'East Bangalore', lat: 12.9863, lng: 77.7317 },
        builder: builder1.id, tags: [{ tag: 'township' }, { tag: 'commercial-hub' }],
        images: getImages(),
        amenities: getAmenities(10),
        units: [
          { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 1000, superBuiltUpArea: 1700, carpetArea: 1300, _id: 'u7' },
        ]
      },
      // BANGALORE 2
      {
        title: 'Godrej Splendour',
        summary: 'Vibrant active living apartments targeting young IT professionals.',
        possessionStatus: 'under-construction', tagsType: 'residential',
        price: 8500000, minPrice: 7000000, maxPrice: 11000000,
        areaInSqft: 1100, noOfUnits: 1100, noOfTowers: 9, reraId: 'RERA-KA-2023-0100',
        targetCompletionDate: '2027-01-31T00:00:00.000Z',
        location: { address: 'Belathur Road', street: 'Whitefield', city: 'Bangalore', state: 'Karnataka', pincode: '560067', region: 'East Bangalore', lat: 13.0039, lng: 77.7471 },
        builder: builder2.id, tags: [{ tag: 'active-living' }, { tag: 'affordable' }],
        images: getImages(),
        amenities: getAmenities(6),
        units: [
          { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 600, superBuiltUpArea: 1100, carpetArea: 800, _id: 'u8' },
        ]
      },
      // PUNE 1
      {
        title: 'Prestige Alpha',
        summary: 'Lush green modern living in Kharadi.',
        possessionStatus: 'under-construction', tagsType: 'residential',
        price: 9500000, minPrice: 8500000, maxPrice: 13000000,
        areaInSqft: 1250, noOfUnits: 400, noOfTowers: 4, reraId: 'RERA-PN-2024-001',
        targetCompletionDate: '2026-12-31T00:00:00.000Z',
        location: { address: 'Kharadi Bypass', street: 'Kharadi', city: 'Pune', state: 'Maharashtra', pincode: '411014', region: 'East Pune', lat: 18.5515, lng: 73.9348 },
        builder: builder1.id, tags: [{ tag: 'tech-park' }],
        images: getImages(),
        amenities: getAmenities(8),
        units: [
          { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 1, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 200, superBuiltUpArea: 1150, carpetArea: 800, _id: 'u9' },
          { noOfRooms: 3, noOfWashrooms: 3, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 200, superBuiltUpArea: 1550, carpetArea: 1100, _id: 'u10' },
        ]
      },
      // PUNE 2
      {
        title: 'Godrej Infinity',
        summary: 'Riverside residences with premium lifestyle amenities.',
        possessionStatus: 'ready', tagsType: 'residential',
        price: 7500000, minPrice: 6500000, maxPrice: 9000000,
        areaInSqft: 1050, noOfUnits: 1200, noOfTowers: 10, reraId: 'RERA-PN-2020-112',
        targetCompletionDate: '2022-06-30T00:00:00.000Z',
        location: { address: 'Keshav Nagar', street: 'Mundhwa', city: 'Pune', state: 'Maharashtra', pincode: '411036', region: 'East Pune', lat: 18.5303, lng: 73.9392 },
        builder: builder2.id, tags: [{ tag: 'riverside' }],
        images: getImages(),
        amenities: getAmenities(9),
        units: [
          { noOfRooms: 2, noOfWashrooms: 2, noOfBalconies: 2, noOfLivingRooms: 1, noOfKitchens: 1, noOfUnits: 800, superBuiltUpArea: 1050, carpetArea: 750, _id: 'u11' },
        ]
      }
    ] as const

    for (const propData of propertiesData) {
      await payload.create({
        collection: 'properties',
        data: propData as any,
      })
      console.log(`  ✅ Created: ${propData.title} (${propData.location.city})`)
    }

    console.log(`\n  ✅ Created ${propertiesData.length} properties\n`)

    // Clean up temporary downloaded files
    fs.readdirSync(tempDir).forEach(f => fs.unlinkSync(path.join(tempDir, f)))
    fs.rmdirSync(tempDir)

    console.log('✨ Full comprehensive seed complete!\n')
    console.log('Summary:')
    console.log(`  - ${primaryImages.length} Images`)
    console.log(`  - 2 Builders`)
    console.log(`  - ${createdAmenities.length} Amenities`)
    console.log(`  - ${propertiesData.length} Properties in Delhi, Mumbai, Bangalore, Pune`)

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
}

seed()
