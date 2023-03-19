import { runProcedure } from '..';
import {
  Hand,
  OpponentData,
  PlayerData,
  Card,
} from '../../models/game';
import { GameStoreState } from '../../store/game/reducer';

export function startGame(token: string | number, roomCode: string | number): Promise<void> {
  return runProcedure<void>('startGame', {
    param1: token,
    param2: roomCode,
  });
}

// type CardsResponse = {
//   RESULTS: [
//     {
//       card_id: string;
//       name: string;
//       effect: string;
//       counterEffect: string;
//       isOpened: boolean;
//     },
//     {
//       card_id: string;
//       name: string;
//       effect: string;
//       counterEffect: string;
//       isOpened: boolean;
//     }
//   ]
// }

// function setCards(resp: CardsResponse): PlayerCards{
//   const playerResp = resp.RESULTS;
//   const card_1: Card = {
//     card_id       : playerResp[0].card_id[0],
//     name          : playerResp[0].name[0],
//     effect        : playerResp[0].effect[0],
//     counterEffect : playerResp[0].counterEffect[0],
//     isOpened      : playerResp[0].isOpened,
//   }
//   const card_2: Card = {
//     card_id       : playerResp[1].card_id[0],
//     name          : playerResp[1].name[0],
//     effect        : playerResp[1].effect[0],
//     counterEffect : playerResp[1].counterEffect[0],
//     isOpened      : playerResp[1].isOpened,
//   }

//   const PC: PlayerCards = {
//     card_1: card_1,
//     card_2: card_2,
//   }

//   return PC;
// }


// export async function getCards(token: string, roomCode: string): Promise<PlayerCards>{
//   const resp = await runProcedure<CardsResponse>('getCards', {
//     param1: token,
//     param2: roomCode,
//   });
//   console.log(resp);
//   return setCards(resp);
// }

type GameStateResponse = {
  RESULTS: [
    {
      id: [number];
      nickname: [string];
      move_order: [number];
      money:  [number];
      card_1: [number];
      card_2: [number];
      opened_1: [boolean];
      opened_2: [boolean];
      is_current_turn: [boolean];
      last_action: [number];
      target: [number];
      lost: [boolean];
    },
    {
      id: [number];
      nickname: [string];
      move_order: [number];
      money:  [number];
      card_1: [number];
      card_2: [number];
      opened_1: [boolean];
      opened_2: [boolean];
      is_current_turn: [boolean];
      last_action: [number];
      target: [number];
      lost: [boolean];
    },
    {
      card_id       : [number],
      name          : [string],  
      effect        : [string],
      counterEffect : [string],
      isOpened      : [boolean],
    },
    {
      winners: [string],
    }
  ];
};

type Answer = {
  RESULTS: [
    {
      answer: [number]
    }
  ]
}

function toGameStoreState(resp: GameStateResponse): GameStoreState {
  
  const playerResp = resp.RESULTS[0];
  const player: PlayerData = {
    id              : playerResp.id[0],
    nickname        : playerResp.nickname[0],
    move_order      : playerResp.move_order[0],
    money           : playerResp.money[0],
    card_1          : playerResp.card_1[0],
    card_2          : playerResp.card_2[0],
    opened_1        : playerResp.opened_1[0],
    opened_2        : playerResp.opened_2[0],
    is_current_turn : playerResp.is_current_turn[0],
    last_action     : playerResp.last_action[0],
    target          : playerResp.target[0],
    lost            : playerResp.lost[0],
  };

  const {
    id,
    nickname,  
    move_order,
    money,     
    card_1,    
    card_2,  
    opened_1,
    opened_2,
    is_current_turn,  
    last_action,
    target,     
    lost,
  } = resp.RESULTS[1];
  const opponents: OpponentData[] = id.map((id, i) => ({
    id,
    nickname        : nickname[i],
    move_order      : move_order[i],
    money           : money[i],
    card_1          : card_1[i],
    card_2          : card_2[i],
    opened_1        : opened_1[i],
    opened_2        : opened_2[i],
    is_current_turn : is_current_turn[i],
    last_action     : last_action[i],
    target          : target[i],
    lost            : lost[i],
  }));

  const hand: Hand = {
    money:  resp.RESULTS[0].money[0],
    card_1: resp.RESULTS[0].card_1[0],
    card_2: resp.RESULTS[0].card_2[0],
  }

  const {
    card_id,
    name,
    effect,        
    counterEffect, 
    isOpened,
  } = resp.RESULTS[2];

  const cards: Card[] = card_id.map((card_id, i) => ({
    card_id,
    name          : name[i],
    effect        : effect[i],
    counterEffect : counterEffect[i],
    isOpened      : isOpened[i],
  }))

  const {
    winners,
  } = resp.RESULTS[3];

  let winner: string;
  winners === undefined ? winner = '0' : winner = winners[0];

  return {
    player,
    opponents,
    hand,
    cards,
    winner,
  };
}

export async function getGameState(
  token: string,
  roomCode: string,
): Promise<GameStoreState> {
  const resp = await runProcedure<GameStateResponse>('getGameState', {
    param1: token,
    param2: roomCode,
  });

  return toGameStoreState(resp);
}

export type ActionResponse = {
  counterEffect: [number],
  description: [string],
}

export async function action(
  token: string,
  roomCode: string,
  action: number,
  target: number,
): Promise<void> {
    return runProcedure<void>('act', {
      param1: token,
      param2: roomCode,
      param3: action,
      param4: target,
    });
}

export async function markDbError(description: string) {
  return runProcedure<void>('markError', {
    param1: description,
  });
}

export async function getAnswer(token: string, roomCode: string): Promise<Answer> {
  const resp = await runProcedure<Answer>('getAnswer',{
    param1: token,
    param2: roomCode,
  });
  return resp;
}

export function next(token: string, roomCode: string): Promise<void> {
  return runProcedure<void>('next', {
    param1: token,
    param2: roomCode,
  });
}

export function handleAction(token: string, roomCode: string, effect: number){
  return runProcedure<void>('handleAction',{
    param1: token,
    param2: roomCode,
    param3: effect,
  })
}

export async function setAnswer(token: string, roomCode: string, effect: number): Promise<void> {
  await runProcedure<number>('setAnswer',{
    param1: token,
    param2: roomCode,
    param3: effect,
  });
}

export async function checkResponse(token: string, roomCode: string, effect: number): Promise<void> {
  await runProcedure<number>('setAnswer',{
    param1: token,
    param2: roomCode,
    param3: effect,
  });
}