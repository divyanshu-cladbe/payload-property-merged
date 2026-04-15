const CACHE_PREFIX = "polyline_cache_";
const CACHE_LIFETIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export interface CachedRoute {
  data: google.maps.DirectionsResult;
  timestamp: number;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}

export interface CachedRouteInfo {
  areaId: string;
  duration: string;
  distance: string;
  path: google.maps.LatLng[];
  routeKey: string;
}

class PolylineCacheManager {
  private memoryCache: Map<string, CachedRoute> = new Map();
  private routeInfoCache: Map<string, CachedRouteInfo> = new Map();

  // Generate a unique cache key from origin and destination
  private generateKey(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ): string {
    return `${origin.lat.toFixed(6)},${origin.lng.toFixed(6)}-${destination.lat.toFixed(6)},${destination.lng.toFixed(6)}`;
  }

  // Check if cache entry is still valid
  private isValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_LIFETIME;
  }

  // Get cached route from memory or localStorage
  getCachedRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ): CachedRoute | null {
    const key = this.generateKey(origin, destination);

    // Try memory cache first (fastest)
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && this.isValid(memoryEntry.timestamp)) {
      // console.log(`[Cache] Memory hit for route: ${key}`);
      return memoryEntry;
    }

    // Try localStorage (survives page refresh)
    try {
      const storageKey = CACHE_PREFIX + key;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: CachedRoute = JSON.parse(stored);
        if (this.isValid(parsed.timestamp)) {
          // console.log(`[Cache] LocalStorage hit for route: ${key}`);
          // Restore to memory cache
          this.memoryCache.set(key, parsed);
          return parsed;
        } else {
          // Expired, remove from localStorage
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.error("[Cache] Error reading from localStorage:", error);
    }

    // console.log(`[Cache] Miss for route: ${key}`);
    return null;
  }

  // Store route in both memory and localStorage
  setCachedRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
    data: google.maps.DirectionsResult
  ): void {
    const key = this.generateKey(origin, destination);
    const cacheEntry: CachedRoute = {
      data,
      timestamp: Date.now(),
      origin,
      destination,
    };

    // Store in memory cache
    this.memoryCache.set(key, cacheEntry);

    // Store in localStorage
    try {
      const storageKey = CACHE_PREFIX + key;
      localStorage.setItem(storageKey, JSON.stringify(cacheEntry));
      // console.log(`[Cache] Stored route: ${key}`);
    } catch (error) {
      console.error("[Cache] Error writing to localStorage:", error);
      // If localStorage is full, try to clean old entries
      this.cleanExpiredEntries();
    }
  }

  // Get cached route info (duration, distance)
  getCachedRouteInfo(routeKey: string): CachedRouteInfo | null {
    return this.routeInfoCache.get(routeKey) || null;
  }

  // Set cached route info
  setCachedRouteInfo(routeKey: string, info: CachedRouteInfo): void {
    this.routeInfoCache.set(routeKey, info);
  }

  // Clear all cached routes
  clearAllRoutes(): void {
    // console.log("[Cache] Clearing all route caches");
    this.memoryCache.clear();
    this.routeInfoCache.clear();

    // Clear localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("[Cache] Error clearing localStorage:", error);
    }
  }

  // Clean expired entries from localStorage
  cleanExpiredEntries(): void {
    try {
      const keys = Object.keys(localStorage);
      let cleanedCount = 0;

      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          const stored = localStorage.getItem(key);
          if (stored) {
            try {
              const parsed: CachedRoute = JSON.parse(stored);
              if (!this.isValid(parsed.timestamp)) {
                localStorage.removeItem(key);
                cleanedCount++;
              }
            } catch {
              // Invalid JSON, remove it
              localStorage.removeItem(key);
              cleanedCount++;
            }
          }
        }
      });

      if (cleanedCount > 0) {
        // console.log(`[Cache] Cleaned ${cleanedCount} expired entries`);
      }
    } catch (error) {
      console.error("[Cache] Error cleaning expired entries:", error);
    }
  }

  // Get cache statistics
  getCacheStats(): {
    memoryEntries: number;
    localStorageEntries: number;
    routeInfoEntries: number;
  } {
    let localStorageEntries = 0;
    try {
      const keys = Object.keys(localStorage);
      localStorageEntries = keys.filter((k) => k.startsWith(CACHE_PREFIX)).length;
    } catch (error) {
      console.error("[Cache] Error getting stats:", error);
    }

    return {
      memoryEntries: this.memoryCache.size,
      localStorageEntries,
      routeInfoEntries: this.routeInfoCache.size,
    };
  }
}

// Export singleton instance
export const polylineCache = new PolylineCacheManager();

// Auto-clean expired entries every 10 minutes
if (typeof window !== "undefined") {
  setInterval(() => {
    polylineCache.cleanExpiredEntries();
  }, 10 * 60 * 1000);
}
