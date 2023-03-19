import { useAppSelector } from '../../hooks/redux';
import {  Card, Hand, OpponentData, PlayerData } from '../../models/game';

export function useGameStoreState() {
  return useAppSelector((state) => state.game);
}

export function usePlayerData(): PlayerData | null {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.player ?? null;
}

export function useOpponentsData(): OpponentData[] | null {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.opponents ?? null;
}

export function useHand(): Hand | null {
  const GameStoreState = useGameStoreState();
  return GameStoreState?.hand ?? null;
}

export function useCard(): Card[] | null{
  const GameStoreState = useGameStoreState();
  return GameStoreState?.cards ?? null;
}
