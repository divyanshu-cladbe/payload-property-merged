import { useState, useCallback, useRef } from "react";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
}

export interface UseAsyncStateOptions {
  retryCount?: number;
  retryDelay?: number;
  cacheTimeout?: number;
}

export const useAsyncState = <T>(
  initialData: T | null = null,
  options: UseAsyncStateOptions = {}
) => {
  const {
    retryCount = 0,
    retryDelay = 1000,
    cacheTimeout = 5 * 60 * 1000,
  } = options;

  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
    lastUpdated: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Execute async operation
  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | null> => {
      // Cancel any ongoing operation
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Clear any pending retries
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      abortControllerRef.current = new AbortController();

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const attemptExecution = async (attempt: number): Promise<T | null> => {
        try {
          const result = await asyncFn();

          setState({
            data: result,
            loading: false,
            error: null,
            lastUpdated: new Date(),
          });

          return result;
        } catch (error) {
          const errorObj =
            error instanceof Error ? error : new Error(String(error));

          // Check if operation was aborted
          if (errorObj.name === "AbortError") {
            return null;
          }

          // Retry logic
          if (attempt < retryCount) {
            return new Promise((resolve) => {
              retryTimeoutRef.current = setTimeout(() => {
                resolve(attemptExecution(attempt + 1));
              }, retryDelay);
            });
          }

          // Final failure
          setState((prev) => ({
            ...prev,
            loading: false,
            error: errorObj,
          }));

          return null;
        }
      };

      return attemptExecution(0);
    },
    [retryCount, retryDelay]
  );

  // Reset state
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setState({
      data: initialData,
      loading: false,
      error: null,
      lastUpdated: null,
    });
  }, [initialData]);

  // Set data directly (for optimistic updates)
  const setData = useCallback((data: T | null) => {
    setState((prev) => ({
      ...prev,
      data,
      lastUpdated: new Date(),
    }));
  }, []);

  // Set error directly
  const setError = useCallback((error: Error | null) => {
    setState((prev) => ({
      ...prev,
      error,
      loading: false,
    }));
  }, []);

  // Check if data is stale
  const isStale = useCallback(() => {
    if (!state.lastUpdated) return true;
    return Date.now() - state.lastUpdated.getTime() > cacheTimeout;
  }, [state.lastUpdated, cacheTimeout]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  return {
    // State
    ...state,

    // Actions
    execute,
    reset,
    setData,
    setError,

    // Utilities
    isStale,
    cleanup,
    hasData: state.data !== null,
    hasError: state.error !== null,
    isIdle: !state.loading && !state.error && state.data === null,
  };
};

// Specialized hook for API calls
export const useApiCall = <T>(options?: UseAsyncStateOptions) => {
  const asyncState = useAsyncState<T>(null, options);

  const call = useCallback(
    (apiCall: () => Promise<T>) => {
      return asyncState.execute(apiCall);
    },
    [asyncState.execute]
  );

  return {
    ...asyncState,
    call,
  };
};

// Hook for paginated data
export const usePaginatedAsyncState = <T>(
  initialData: T[] = [],
  options?: UseAsyncStateOptions
) => {
  const asyncState = useAsyncState<T[]>(initialData, options);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(
    async (loadFn: (page: number) => Promise<T[]>) => {
      const newData = await asyncState.execute(() => loadFn(page));

      if (newData && newData.length > 0) {
        // Append to existing data
        asyncState.setData([...(asyncState.data || []), ...newData]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }

      return newData;
    },
    [asyncState, page]
  );

  const resetPagination = useCallback(() => {
    setPage(1);
    setHasMore(true);
    asyncState.reset();
  }, [asyncState]);

  return {
    ...asyncState,
    hasMore,
    page,
    loadMore,
    resetPagination,
  };
};
