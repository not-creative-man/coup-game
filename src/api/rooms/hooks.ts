import { useCallback, useEffect, useState } from 'react';
import { showRooms } from './api';
import { useAppDispatch } from '../../hooks/redux';
import { Room } from '../../models/room';
import { useToken } from '../../store/account/hooks';
import { setStoreError } from '../../store/error/actions';
import { getErrorMessage } from '../../utils/error';

export function useShowRooms() {
  const token = useToken();
  const dispatch = useAppDispatch();
  const [rooms, setRooms] = useState<Room[] | null>();

  const updateRooms = useCallback(async () => {
    if (!token) {
      setRooms(null);
      return;
    }

    try {
      const respRooms = await showRooms(token);
      setRooms(respRooms);
      console.log('updated rooms');
    } catch (e: any) {
      const message = getErrorMessage(e);
      console.error(message);
      dispatch(setStoreError({ message }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    let updateRoomsTimeout: NodeJS.Timeout;

    async function updateRoomsInTimeout() {
      try {
        await updateRooms();
      } finally {
        updateRoomsTimeout = setTimeout(() => updateRoomsInTimeout(), 5000);
      }
    }

    updateRoomsInTimeout();

    return () => clearTimeout(updateRoomsTimeout);
  }, [token, dispatch, updateRooms]);

  return rooms;
}
