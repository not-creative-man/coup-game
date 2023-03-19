import { createReducer } from '@reduxjs/toolkit';
import {
  Card,
  Hand,
  OpponentData,
  PlayerData,
} from '../../models/game';
import {
  clearGameStoreState,
  setGameStoreState,
  setTurnEndsIn,
} from './actions';

export type GameStoreState = null | {
  player: PlayerData;
  opponents: OpponentData[];
  hand: Hand;
  cards: Card[];
  winner: string;
};

export type PlayerCards = null | {
  card_1: Card;
  card_2: Card;
}

const initialState: GameStoreState = null;

export default createReducer(initialState as GameStoreState, (builder) =>
  builder
    .addCase(setGameStoreState, (state, { payload }) => (state = payload))
    .addCase(clearGameStoreState, (state) => (state = null))
    .addCase(setTurnEndsIn, (state, { payload }) => {
      if (!state) return;

      // state.turnEndsIn = payload;
    }),
);
