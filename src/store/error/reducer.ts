import { createReducer } from '@reduxjs/toolkit';
import { clearStoreError, setStoreError } from './actions';

type ErrorState = { message: string | null };

const initialState: ErrorState = { message: null };

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setStoreError, (state, { payload }) => {
      const { message } = payload;

      state.message = message;
    })
    .addCase(clearStoreError, (state) => {
      state.message = null;
    }),
);
