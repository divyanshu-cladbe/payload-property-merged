// constants/floor-plan.ts
export const floorPlanFileTypes = [
    'image',
    'pdf',
    '3d'
  ] as const;
  export type FloorPlanFileType = typeof floorPlanFileTypes[number];
  
  export const roomTypes = [
    'masterBedroom',
    'bedroom',
    'kitchen',
    'livingRoom',
    'balcony',
    'bathroom',
    'study',
    'pooja',
    'servant'
  ] as const;
  
  export type RoomType = (typeof roomTypes)[number];
  
  export const facingOptions = [
    'North',
    'South',
    'East',
    'West',
    'North East',
    'North West',
    'South East',
    'South West'
  ] as const;
  export type FacingOption = typeof facingOptions[number];
  
  export const furnishingStatus = [
    'Unfurnished',
    'Semi-Furnished',
    'Fully-Furnished'
  ] as const;
  export type FurnishingStatus = typeof furnishingStatus[number];
  
  export const floorPlanViewTypes = [
    '2D',
    '3D',
    'Isometric'
  ] as const;
  export type FloorPlanViewType = typeof floorPlanViewTypes[number];
  
  export const floorPlanStatus = [
    'available',
    'sold-out',
    'coming-soon',
    'limited'
  ] as const;
  export type FloorPlanStatus = typeof floorPlanStatus[number];