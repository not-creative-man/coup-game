import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountChecker } from '../../store/account/updater';
// import { CreateRoomPage } from './CreateRoomPage';
import RoomsDashboard from './RoomsDashboard';
import { RoomPage } from './RoomPage';
import { JoinRoomPage } from './JoinRoomPage';

function RoomsPage() {
  return (
    <>
      <AccountChecker />
      <Routes>
        <Route path='/' element={<RoomsDashboard />} />
        <Route path='/join' element={<JoinRoomPage />} />
        <Route path='/:code' element={<RoomPage />} />
      </Routes>
    </>
  );
}

export default RoomsPage;
