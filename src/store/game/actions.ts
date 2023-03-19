import { createAction } from '@reduxjs/toolkit';
import { GameStoreState } from './reducer';

export const setGameStoreState = createAction<GameStoreState>(
  'game/setGameStoreState',
);
export const setTurnEndsIn = createAction<number>('game/setTurnEndsIn');

export const clearGameStoreState = createAction('game/clearGameStoreState');
