import { createAction } from '@reduxjs/toolkit';
import { RoomState } from '../../models/room';

export const saveRoomState = createAction<{
  roomState: RoomState;
  code: string;
}>('room/saveRoomState');

export const setRoomCode = createAction<{
  code: string;
}>('room/setRoomCode');

export const updateRoomState = createAction<{
  roomState: RoomState;
}>('room/updateRoomState');

export const clearRoomState = createAction('room/clearRoomState');
