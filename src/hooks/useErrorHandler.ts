import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  message: string;
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: '',
  });

  const handleError = useCallback((error: unknown) => {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    setError({ hasError: true, message });
  }, []);

  const resetError = useCallback(() => {
    setError({ hasError: false, message: '' });
  }, []);

  return {
    error,
    handleError,
    resetError,
  };
}