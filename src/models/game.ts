export type PlayerData = {
  id: number;
  nickname: string;
  move_order: number;
  money: number;
  card_1: number;
  card_2: number;
  opened_1: boolean;
  opened_2: boolean;  
  is_current_turn: boolean; 
  last_action: number;
  target: number;
  lost: boolean;
};

export type OpponentData = PlayerData;

export type Hand = {
  money: number;
  card_1: number;
  card_2: number;
};

export type Card = {
  card_id: number;
  name: string;
  effect: string;
  counterEffect: string;
  isOpened: boolean;
}