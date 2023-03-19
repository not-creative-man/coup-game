export type Room = {
  code: string;
  admin: { login: string; nickname: string };
  hasGameStarted: boolean;
  hasEntered: boolean;
};

export type RoomMember = { login: string; nickname: string; isAdmin: boolean };
export type RoomState = {
  hasGameStarted: boolean;
  members: RoomMember[];
};
