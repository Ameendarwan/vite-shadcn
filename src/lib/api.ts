import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ServerError {
  data: {
    message: string;
    status_text: string;
    success: boolean;
  };
  status: number;
}

export interface FetchError {
  status: string;
  error: string;
}

/** Type Guard to flag whether provided arg is an RTK error */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

/** Type Guard to flag whether safe to render expected server error shape */
export function isServerError(error: unknown): error is ServerError {
  return (
    isFetchBaseQueryError(error) && typeof error.data === 'object' && error.data !== null && 'message' in error.data
  );
}

/** Type Guard to flag whether RTK error is also a fetch error */
export function isFetchError(error: unknown): error is FetchError {
  return isFetchBaseQueryError(error) && error.status === 'FETCH_ERROR';
}

/** Type Guard to flag whether payload has the optional 'alert' property */
export function isPayloadWithAlert(
  action: PayloadAction<unknown>
): action is PayloadAction<Partial<{ alert: string }>> {
  return typeof action.payload === 'object' && action.payload !== null && 'alert' in action.payload;
}
