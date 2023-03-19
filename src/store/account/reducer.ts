import { createReducer } from '@reduxjs/toolkit';
import { clearAccountData, setAccountData } from './actions';

type AccountState = {
  token: string | null;
  login: string;
};

const initialState: AccountState = {
  token: null,
  login: '',
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setAccountData, (state, { payload }) => {
      const { token, login } = payload;
      state.token = token;
      state.login = login;
    })
    .addCase(clearAccountData, (state) => {
      state.token = null;
      state.login = '';
    }),
);
