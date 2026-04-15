interface ContentItem {
  id: string;
  elementId: string;
  cloudflareImageUrl: string | null;
  r2Path: string | null;
  contentType: string;
  priority: number;
  validFrom: string;
  validTo: string | null;
}

interface PageData {
  [elementId: string]: ContentItem;
}

interface ApiResponse {
  success: boolean;
  content: ContentItem[];
}

class ContentMapSingleton {
  private static instance: ContentMapSingleton;
  private pages: Map<string, PageData> = new Map();
  private loading: Set<string> = new Set();
  private apiUrl: string;
  private listeners: Set<() => void> = new Set();

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003/api/v1";
  }

  static getInstance(): ContentMapSingleton {
    if (!ContentMapSingleton.instance) {
      ContentMapSingleton.instance = new ContentMapSingleton();
    }
    return ContentMapSingleton.instance;
  }

  async fetchPage(cityId: string, pageId: string): Promise<void> {
    // Skip silently if old content API is not configured
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) return;

    const key = `${cityId}:${pageId}`;
    if (this.pages.has(key) || this.loading.has(key)) {
      return;
    }

    this.loading.add(key);

    try {
      const url = `${this.apiUrl}/content?city_id=${cityId}&page_id=${pageId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success && Array.isArray(data.content)) {
        const pageData: PageData = {};
        data.content.forEach((item) => {
          pageData[item.elementId] = item;
        });
        this.pages.set(key, pageData);
        this.notifyListeners();
      }
    } catch (error) {
      // Silently suppress - contentMap is optional CMS content overlay
    } finally {
      this.loading.delete(key);
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  page(cityId: string, pageId: string): ElementSelector {
    const key = `${cityId}:${pageId}`;
    const pageData = this.pages.get(key);
    return new ElementSelector(pageData);
  }

  isPageLoaded(cityId: string, pageId: string): boolean {
    const key = `${cityId}:${pageId}`;
    return this.pages.has(key);
  }

  isPageLoading(cityId: string, pageId: string): boolean {
    const key = `${cityId}:${pageId}`;
    return this.loading.has(key);
  }

  clearPage(cityId: string, pageId: string): void {
    const key = `${cityId}:${pageId}`;
    this.pages.delete(key);
  }

  clearAll(): void {
    this.pages.clear();
  }

  getLoadedPages(): string[] {
    return Array.from(this.pages.keys());
  }
}

class ElementSelector {
  private pageData: PageData | undefined;

  constructor(pageData: PageData | undefined) {
    this.pageData = pageData;
  }

  element(elementId: string): ContentAccessor {
    const content = this.pageData?.[elementId] || null;
    return new ContentAccessor(content);
  }
}

class ContentAccessor {
  private content: ContentItem | null;

  constructor(content: ContentItem | null) {
    this.content = content;
  }

  get url(): string | null {
    return this.content?.cloudflareImageUrl || this.content?.r2Path || null;
  }

  get r2(): string | null {
    return this.content?.r2Path || null;
  }

  get data(): ContentItem | null {
    return this.content;
  }

  get type(): string | null {
    return this.content?.contentType || null;
  }

  get exists(): boolean {
    return this.content !== null;
  }

  urlOr(fallback: string): string {
    return this.url || fallback;
  }
}

export const contentMap = ContentMapSingleton.getInstance();
