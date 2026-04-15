interface CityAlias {
  name: string;
  aliases: string[];
  regions?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

interface CityGroup {
  name: string;
  cities: string[];
  aliases?: string[];
  mainCity?: string; // Primary city in the group
}

//INFO: City configurations - Enhanced with all major Indian cities
export const CITY_ALIASES: CityAlias[] = [
  {
    name: "mumbai",
    aliases: ["bombay"],
    regions: ["andheri east", "bandra west", "powai", "thane west", "worli", "malad", "goregaon", "kandivali"],
    coordinates: { lat: 19.0760, lng: 72.8777 },
    bounds: { north: 19.27, south: 18.89, east: 72.98, west: 72.77 },
  },
  {
    name: "pune",
    aliases: [],
    regions: ["hinjewadi", "baner", "wakad", "hadapsar", "kharadi", "aundh", "viman nagar", "koregaon park"],
    coordinates: { lat: 18.5204, lng: 73.8567 },
  },
  {
    name: "lucknow",
    aliases: [],
    regions: ["gomti nagar", "hazratganj", "aliganj", "indira nagar", "mahanagar", "vrindavan yojana", "jankipuram", "ashiyana"],
    coordinates: { lat: 26.8467, lng: 80.9462 },
  },
  {
    name: "noida",
    aliases: ["greater noida"],
    regions: ["sector 62", "sector 18", "sector 135", "sector 76", "greater noida west", "sector 128", "sector 37", "sector 50"],
    coordinates: { lat: 28.5355, lng: 77.3910 },
  },
  {
    name: "chennai",
    aliases: ["madras"],
    regions: ["omr", "ecr", "anna nagar", "t nagar", "adyar", "velachery", "tambaram", "perungudi"],
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
  {
    name: "bangalore",
    aliases: ["bengaluru", "bengalooru"],
    regions: ["whitefield", "electronic city", "sarjapur road", "hebbal", "koramangala", "indiranagar", "jp nagar", "btm layout"],
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    name: "hyderabad",
    aliases: [],
    regions: ["gachibowli", "hitech city", "kondapur", "madhapur", "jubilee hills", "banjara hills", "kukatpally", "miyapur"],
    coordinates: { lat: 17.3850, lng: 78.4867 },
  },
  {
    name: "ahmedabad",
    aliases: [],
    regions: ["bopal", "prahlad nagar", "satellite", "sg highway", "vastrapur", "thaltej", "gota", "shela"],
    coordinates: { lat: 23.0225, lng: 72.5714 },
  },
  {
    name: "ranchi",
    aliases: [],
    regions: ["kanke road", "main road", "circular road", "station road", "hindpiri", "lalpur", "harmu", "doranda"],
    coordinates: { lat: 23.6102, lng: 85.3240 },
  },
  {
    name: "kanpur",
    aliases: [],
    regions: ["civil lines", "mall road", "govind nagar", "kakadeo", "swaroop nagar", "kidwai nagar", "arya nagar", "kalyanpur"],
    coordinates: { lat: 26.4499, lng: 80.3319 },
  },
  {
    name: "jaipur",
    aliases: [],
    regions: ["malviya nagar", "vaishali nagar", "mansarovar", "c-scheme", "tonk road", "jln marg", "sanganer", "sikar road"],
    coordinates: { lat: 26.9124, lng: 75.7873 },
  },
  {
    name: "delhi",
    aliases: ["new delhi", "dilli"],
    regions: ["dwarka", "greater kailash", "vasant kunj", "saket", "hauz khas", "connaught place", "karol bagh", "lajpat nagar"],
    coordinates: { lat: 28.6139, lng: 77.209 },
    bounds: { north: 28.88, south: 28.4, east: 77.4, west: 76.83 },
  },
  {
    name: "kolkata",
    aliases: ["calcutta"],
    regions: ["salt lake", "new town", "park street", "ballygunge", "alipore", "howrah", "rajarhat", "behala"],
    coordinates: { lat: 22.5726, lng: 88.3639 },
  },
  {
    name: "kochi",
    aliases: ["cochin"],
    regions: ["kakkanad", "marine drive", "edappally", "vyttila", "fort kochi", "palarivattom", "panampilly nagar", "mg road"],
    coordinates: { lat: 9.9312, lng: 76.2673 },
  },
  {
    name: "indore",
    aliases: [],
    regions: ["vijay nagar", "scheme no. 54", "ab road", "ring road", "palasia", "bicholi mardana", "nipania", "rau"],
    coordinates: { lat: 22.7196, lng: 75.8577 },
  },
];

export const CITY_GROUPS: CityGroup[] = [
  {
    name: "delhi-ncr",
    cities: [
      "delhi",
      "gurgaon",
      "gurugram",
      "noida",
      "greater noida",
      "ghaziabad",
      "faridabad",
    ],
    aliases: ["national capital region", "ncr"],
    mainCity: "delhi",
  },
  {
    name: "mumbai-mmr",
    cities: ["mumbai", "thane", "navi mumbai", "kalyan", "dombivli"],
    aliases: ["mumbai metropolitan region", "mmr"],
    mainCity: "mumbai",
  },
];

export class LocationHelper {
  private static normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  //INFO: Check if two locations match based on city name, aliases, and regions
  public static isLocationMatch(location1: string, location2: string): boolean {
    const normalizedLoc1 = this.normalizeText(location1);
    const normalizedLoc2 = this.normalizeText(location2);

    //INFO: Direct match
    if (normalizedLoc1 === normalizedLoc2) return true;

    //INFO: Check city aliases and regions
    for (const city of CITY_ALIASES) {
      const isLoc1Match =
        normalizedLoc1 === city.name ||
        city.aliases.some((alias) =>
          normalizedLoc1.includes(this.normalizeText(alias))
        );

      const isLoc2Match =
        normalizedLoc2 === city.name ||
        city.aliases.some((alias) =>
          normalizedLoc2.includes(this.normalizeText(alias))
        ) ||
        (city.regions &&
          city.regions.some((region) =>
            normalizedLoc2.includes(this.normalizeText(region))
          ));

      if (isLoc1Match && isLoc2Match) return true;
    }

    //INFO: Check city groups
    for (const group of CITY_GROUPS) {
      const isLoc1InGroup =
        normalizedLoc1.includes(group.name) ||
        (group.aliases &&
          group.aliases.some((alias) =>
            normalizedLoc1.includes(this.normalizeText(alias))
          ));

      const isLoc2InGroup = group.cities.some((city) =>
        normalizedLoc2.includes(this.normalizeText(city))
      );

      if (isLoc1InGroup && isLoc2InGroup) return true;
    }

    return false;
  }

  //INFO: Get bounds for a given city
  public static getCityBounds(
    cityName: string
  ): { north: number; south: number; east: number; west: number } | null {
    const normalizedCity = this.normalizeText(cityName);

    //INFO: Check direct city matches
    const cityMatch = CITY_ALIASES.find(
      (city) =>
        city.name === normalizedCity ||
        city.aliases.some((alias) =>
          normalizedCity.includes(this.normalizeText(alias))
        )
    );

    if (cityMatch?.bounds) {
      return cityMatch.bounds;
    }

    //INFO: Check city groups and return main city bounds
    const groupMatch = CITY_GROUPS.find((group) =>
      group.cities.some((city) =>
        normalizedCity.includes(this.normalizeText(city))
      )
    );

    if (groupMatch?.mainCity) {
      const mainCityData = CITY_ALIASES.find(
        (city) => city.name === groupMatch.mainCity
      );
      if (mainCityData?.bounds) {
        return mainCityData.bounds;
      }
    }

    return null;
  }

  //INFO: Get coordinates for a given city
  public static getCityCoordinates(
    cityName: string
  ): { lat: number; lng: number } | null {
    const normalizedCity = this.normalizeText(cityName);

    //INFO: Check direct city matches
    const cityMatch = CITY_ALIASES.find(
      (city) =>
        city.name === normalizedCity ||
        city.aliases.some((alias) =>
          normalizedCity.includes(this.normalizeText(alias))
        )
    );

    if (cityMatch?.coordinates) {
      return cityMatch.coordinates;
    }

    //INFO: Check city groups
    const groupMatch = CITY_GROUPS.find((group) =>
      group.cities.some((city) =>
        normalizedCity.includes(this.normalizeText(city))
      )
    );

    if (groupMatch?.mainCity) {
      const mainCityData = CITY_ALIASES.find(
        (city) => city.name === groupMatch.mainCity
      );
      if (mainCityData?.coordinates) {
        return mainCityData.coordinates;
      }
    }

    return null;
  }

  //INFO: Calculate distance between two coordinates in kilometers
  public static calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLng = this.toRad(point2.lng - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(point1.lat)) *
        Math.cos(this.toRad(point2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(value: number): number {
    return (value * Math.PI) / 180;
  }

  //INFO: Get nearby locations based on coordinates and radius
  public static getNearbyLocations<T>(
    items: T[],
    center: { lat: number; lng: number },
    radius: number,
    coordinatesExtractor: (item: T) => { lat: number; lng: number }
  ): T[] {
    return items.filter((item) => {
      const coordinates = coordinatesExtractor(item);
      const distance = this.calculateDistance(center, coordinates);
      return distance <= radius;
    });
  }

  //INFO: Get main city from address
  public static getMainCity(address: string): string {
    const normalizedAddress = this.normalizeText(address);

    // Check city groups first
    for (const group of CITY_GROUPS) {
      if (
        normalizedAddress.includes(group.name) ||
        (group.aliases &&
          group.aliases.some((alias) =>
            normalizedAddress.includes(this.normalizeText(alias))
          ))
      ) {
        return group.mainCity || group.name;
      }

      //INFO: Check if address contains any city from the group
      if (
        group.cities.some((city) =>
          normalizedAddress.includes(this.normalizeText(city))
        )
      ) {
        return group.mainCity || group.name;
      }
    }

    //INFO: Check individual cities
    for (const city of CITY_ALIASES) {
      if (
        normalizedAddress.includes(city.name) ||
        city.aliases.some((alias) =>
          normalizedAddress.includes(this.normalizeText(alias))
        ) ||
        (city.regions &&
          city.regions.some((region) =>
            normalizedAddress.includes(this.normalizeText(region))
          ))
      ) {
        return city.name;
      }
    }

    return address;
  }

  //INFO: Check if a location is within a specific region/group
  public static isInRegion(location: string, region: string): boolean {
    const normalizedLocation = this.normalizeText(location);
    const normalizedRegion = this.normalizeText(region);

    const group = CITY_GROUPS.find(
      (g) =>
        g.name === normalizedRegion ||
        (g.aliases &&
          g.aliases.some(
            (alias) => normalizedRegion === this.normalizeText(alias)
          ))
    );

    if (group) {
      return group.cities.some((city) =>
        normalizedLocation.includes(this.normalizeText(city))
      );
    }

    const city = CITY_ALIASES.find((c) => c.name === normalizedRegion);
    if (city && city.regions) {
      return city.regions.some((r) =>
        normalizedLocation.includes(this.normalizeText(r))
      );
    }

    return false;
  }

  //INFO: Get all regions/areas for a city
  public static getRegionsForCity(cityName: string): string[] {
    const normalizedCity = this.normalizeText(cityName);

    //INFO: Check city groups
    const group = CITY_GROUPS.find(
      (g) => g.name === normalizedCity || g.cities.includes(normalizedCity)
    );

    if (group) {
      return group.cities;
    }

    //INFO: Check individual cities
    const city = CITY_ALIASES.find(
      (c) =>
        c.name === normalizedCity ||
        c.aliases.some((alias) => normalizedCity === this.normalizeText(alias))
    );

    if (city && city.regions) {
      return city.regions;
    }

    return [];
  }

  //INFO: Get available cities for selection
  public static getAvailableCities(): {
    name: string;
    coordinates: { lat: number; lng: number };
    bounds?: any;
  }[] {
    return CITY_ALIASES.filter((city) => city.coordinates).map((city) => ({
      name: city.name,
      coordinates: city.coordinates!,
      bounds: city.bounds,
    }));
  }
}
