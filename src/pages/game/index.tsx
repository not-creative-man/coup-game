import { useEffect } from 'react';
import styled from 'styled-components';
import { markDbError } from '../../api/game/api';
import { useGameAPI } from '../../api/game/hooks';
import { useToken } from '../../store/account/hooks';
import {
  useGameStoreState, usePlayerData,
} from '../../store/game/hooks';
import { useRoomCode } from '../../store/room/hooks';
import { getErrorMessage } from '../../utils/error';

import { GameTurn } from './GameServises';
import { OpponentsTable } from './opponents';
import { PlayersData } from './PlayersState';
import { BottomButtonsList } from './PlayersState/BottomButtonsList';
import { WinModal } from './WinInfo';

const GamePageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;    
  justify-content: space-around;
  align-items: center;
`;

type B = {
  num: number;
  name: string;
  desc: string;
}

export const myTurn: B[] = [
  {num: 1, name:"Доход", desc: "Возьмите 1 монету"},
  {num: 2, name:"Иностранная помощь", desc: "Возьмите 2 монеты"},
  {num: 3, name:"ПЕРЕВОРОТ", desc: "Заплатите 7 монет и уберите одно очко влияния у игрока ГАРАНТИРОВАННО"},
  {num: 4, name:"Налог", desc: "Возьмите 3 монеты"},
  {num: 6, name:"Убийство", desc: "Заплатите 3 монеты и уберите одно очко влияния у игрока"},
  {num: 8, name:"Воровство", desc: "Возьмите 2 монеты с руки другого игрока"},
];

export const otherTurn: B[] = [
  {num: 5, name:"Блокируйте иностранную помощь (получение 2 монет)", desc: "Блокируйте иностранную помощь (получение 2 монет)"},
  {num: 7, name:"Блокируйте воровство", desc: "Блокируйте воровство"},
  {num: 9, name:"Блокирует убийство", desc: "Блокирует убийство"},
  {num: 10, name:"Согласиться с действием", desc: "Согласиться с действием"},
  {num: 11, name:"Не согласиться с действием", desc: "Не согласиться с действием"},
];

export const cards: B[] = [
  {num: 1, name: "Губернатор", desc: "Налог"},
  {num: 2, name: "Губернатор", desc: "Налог"},
  {num: 3, name: "Губернатор", desc: "Налог"},
  {num: 4, name: "Убийца", desc: "Убийство"},
  {num: 5, name: "Убийца", desc: "Убийство"},
  {num: 6, name: "Убийца", desc: "Убийство"},
  {num: 7, name: "Городовой", desc: "Воровство"},
  {num: 8, name: "Городовой", desc: "Воровство"},
  {num: 9, name: "Городовой", desc: "Воровство"},
  {num: 10, name: "Графиня", desc: "Блокирует убийство"},
  {num: 11, name: "Графиня", desc: "Блокирует убийство"},
  {num: 12, name: "Графиня", desc: "Блокирует убийство"},
]

export function GamePage(){

  const token = useToken();

  const gameStoreState = useGameStoreState();
  const roomCode = useRoomCode();

  useUpdatedGameState(roomCode);

  if (!gameStoreState) return null;

  return (
      <GamePageWrapper>
        <h1>COUP {roomCode} {token}</h1>
        <GameTurn />
        <Wrapper>
          <PlayersData />
          <OpponentsTable />
        </Wrapper>
        <BottomButtonsList />
        <WinModal />
      </GamePageWrapper>
  );
}

function useUpdatedGameState(code: string | null) {
  const gameApi = useGameAPI();
  const stateRoomCode = useRoomCode();

  //update game state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    async function updateGameStateInTimeout() {
      if (!code || code !== stateRoomCode || !gameApi) return;

      try {
        await gameApi!.updateGameState();
      } catch (e) {
        console.error(e);
        markDbError(getErrorMessage(e));
      }

      if (gameApi) {
        timeout = setTimeout(() => updateGameStateInTimeout(), 5000);
      }
    }

    updateGameStateInTimeout();

    return () => clearTimeout(timeout);
  }, [gameApi, code, stateRoomCode]);
}
