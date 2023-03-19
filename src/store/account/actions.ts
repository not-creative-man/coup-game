import { createAction } from '@reduxjs/toolkit';

export const setAccountData = createAction<{ token: string; login: string }>(
  'account/setAccountData',
);
export const clearAccountData = createAction('account/clearAccountData');
