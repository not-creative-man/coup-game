import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';
import { proceduresApi } from '../services/sql-procedures/helper';
import account from './account/reducer';
import room from './room/reducer';
import error from './error/reducer';
import game from './game/reducer';

const PERSISTED_KEYS: string[] = ['account'];

const rootReducer = combineReducers({
  account,
  room,
  error,
  game,
  [proceduresApi.reducerPath]: proceduresApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(proceduresApi.middleware)
        .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
    preloadedState: load({
      states: PERSISTED_KEYS,
      disableWarnings: process.env.NODE_ENV === 'test',
    }),
  });
};

export type AppState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
export type AppDipatch = AppStore['dispatch'];
