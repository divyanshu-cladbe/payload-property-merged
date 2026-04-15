import { useState, useCallback, useRef } from "react";

export interface ApiCallOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retryCount?: number;
  retryDelay?: number;
}

export interface ApiCallState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isRetrying: boolean;
  retryAttempt: number;
}

export const useApiCall = <T = unknown>() => {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isRetrying: false,
    retryAttempt: 0,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (
      apiCall: () => Promise<T>,
      options: ApiCallOptions<T> = {}
    ): Promise<T | null> => {
      const { onSuccess, onError, retryCount = 0, retryDelay = 1000 } = options;

      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isRetrying: prev.retryAttempt > 0,
      }));

      const attemptCall = async (attempt: number): Promise<T | null> => {
        try {
          const result = await apiCall();

          setState((prev) => ({
            ...prev,
            data: result,
            isLoading: false,
            error: null,
            isRetrying: false,
            retryAttempt: 0,
          }));

          onSuccess?.(result);
          return result;
        } catch (error) {
          const apiError =
            error instanceof Error ? error : new Error(String(error));

          // If this is an abort, don't update state
          if (apiError.name === "AbortError") {
            return null;
          }

          // Retry logic
          if (attempt < retryCount) {
            setState((prev) => ({
              ...prev,
              isRetrying: true,
              retryAttempt: attempt + 1,
            }));

            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            return attemptCall(attempt + 1);
          }

          // Final failure
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: apiError,
            isRetrying: false,
            retryAttempt: 0,
          }));

          onError?.(apiError);
          return null;
        }
      };

      return attemptCall(0);
    },
    []
  );

  const reset = useCallback(() => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState({
      data: null,
      isLoading: false,
      error: null,
      isRetrying: false,
      retryAttempt: 0,
    });
  }, []);

  const retry = useCallback(
    (apiCall: () => Promise<T>, options: ApiCallOptions<T> = {}) => {
      return execute(apiCall, options);
    },
    [execute]
  );

  return {
    // State
    ...state,

    // Actions
    execute,
    reset,
    retry,

    // Utilities
    isIdle: !state.isLoading && !state.error && !state.data,
    hasData: state.data !== null,
    hasError: state.error !== null,
  };
};

// Specialized hook for form submissions
export const useFormSubmission = <T = unknown, D = unknown>() => {
  const apiCall = useApiCall<T>();

  const submitForm = useCallback(
    async (
      formData: D,
      submitFunction: (data: D) => Promise<T>,
      options: ApiCallOptions<T> = {}
    ) => {
      return apiCall.execute(() => submitFunction(formData), {
        ...options,
        retryCount: options.retryCount ?? 1, // Forms usually retry once
      });
    },
    [apiCall]
  );

  return {
    ...apiCall,
    submitForm,
    isSubmitting: apiCall.isLoading,
  };
};
