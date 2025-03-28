import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit'; // Correct import
import { useMemo } from 'react';

type ApiError = FetchBaseQueryError | SerializedError | undefined;

const useErrorMessage = (error: ApiError) => {
  return useMemo(() => {
    if (!error) return null;

    if ('status' in error) {
      return (error.data as { message?: string })?.message || `HTTP Error: ${error.status}`;
    } else {
      return error.message || 'An unexpected error occurred';
    }
  }, [error]);
};

export default useErrorMessage;
