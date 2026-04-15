import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Property } from '@/types/property';

interface UseInfiniteScrollOptions {
  initialItemsPerPage?: number;
  threshold?: number; // Percentage of scroll to trigger load more (0-1)
  loadMoreDelay?: number; // Delay in ms for loading simulation
}

interface UseInfiniteScrollReturn {
  displayedItems: Property[];
  hasMore: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  reset: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function useInfiniteScroll(
  allItems: Property[],
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const {
    initialItemsPerPage = 10,
    threshold = 0.8,
    loadMoreDelay = 300
  } = options;

  const [displayedCount, setDisplayedCount] = useState(initialItemsPerPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Memoize displayed items to prevent unnecessary re-renders
  const displayedItems = useMemo(() => {
    return allItems.slice(0, displayedCount);
  }, [allItems, displayedCount]);

  // Check if there are more items to load
  const hasMore = displayedCount < allItems.length;

  // Load more items with improved debouncing
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    
    // Clear any existing timeout
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    
    // Simulate loading delay for smooth UX
    loadMoreTimeoutRef.current = setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + initialItemsPerPage, allItems.length));
      setIsLoadingMore(false);
    }, loadMoreDelay);
  }, [hasMore, isLoadingMore, initialItemsPerPage, allItems.length, loadMoreDelay]);

  // Reset to initial state
  const reset = useCallback(() => {
    // Clear any pending load more timeout
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    
    setDisplayedCount(initialItemsPerPage);
    setIsLoadingMore(false);
    
    // Scroll to top smoothly
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialItemsPerPage]);

  // Improved scroll handler with better detection
  const handleScroll = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !hasMore || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    
    // More precise scroll detection
    const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    
    // Trigger load more if we're close to the bottom (either by percentage or absolute distance)
    if (scrolledPercentage >= threshold || distanceFromBottom <= 100) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore, threshold]);

  // Throttled scroll handler to improve performance
  const throttledHandleScroll = useCallback(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll])();

  // Set up scroll listener with improved setup
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Use passive listener for better performance
    scrollElement.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Also check on resize in case container size changes
    const handleResize = () => {
      // Delay to ensure layout has settled
      setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      scrollElement.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [throttledHandleScroll, handleScroll]);

  // Reset when allItems change (e.g., when filters change)
  useEffect(() => {
    // Clear any pending load more timeout
    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }
    
    setDisplayedCount(initialItemsPerPage);
    setIsLoadingMore(false);
  }, [allItems, initialItemsPerPage]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current) {
        clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  return {
    displayedItems,
    hasMore,
    isLoadingMore,
    loadMore,
    reset,
    scrollRef
  };
}