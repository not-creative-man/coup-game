import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setRoomCode } from './actions';

export function useRoomCode() {
  const { code } = useParams();
  const stateRoomCode = useAppSelector((state) => state.room.code);
  const dispatch = useAppDispatch();

  //save room code
  useEffect(() => {
    if (!code || code === stateRoomCode) return;

    dispatch(setRoomCode({ code }));
  }, [code, stateRoomCode, dispatch]);

  return stateRoomCode;
}

export function useRoomState() {
  return useAppSelector((state) => state.room.roomState);
}
