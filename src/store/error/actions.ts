import { createAction } from '@reduxjs/toolkit';

export const setStoreError = createAction<{ message: string | null }>(
  'room/setError',
);

export const clearStoreError = createAction('room/clearError');
