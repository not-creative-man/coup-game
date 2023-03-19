// import { useState } from 'react';
import { Plus } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../../../components/common/Button';
import { clearAccountData } from '../../../store/account/actions';
import { useAppDispatch } from '../../../hooks/redux';
import { useShowRooms } from '../../../api/rooms/hooks';
import { useToken, useAccountLogin } from '../../../store/account/hooks';
import { joinRoomPagePath, roomPath,  } from '../../../utils/paths';
import { createRoom } from '../../../api/rooms/api';
import { RoomsTable } from './RoomsTable';

const RoomsDashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-top: 1rem;
  gap: 2rem;

  position: relative;
`;

const RoomsDashboardHeading = styled.h1`
  margin: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;

`;

const CreateRoomButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 1rem;
  margin-right: 10px;
`;
const CreateRoomIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4px;
`;

const PageButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 1rem;
  margin-right: 10px;
`

const JoinButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin-bottom: 1rem;
  margin-right: 10px;
`

function RoomsDashboard() {
  const token = useToken();
  const login = useAccountLogin();
  const rooms = useShowRooms();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSumbit(event: React.FormEvent) {
    event.preventDefault();

    if (!token) return;

    createRoom( token, ).then((code) => {
      if (code) navigate(roomPath(code.toString()));
    });
  }

  return (
    <RoomsDashboardWrapper>
      <RoomsDashboardHeading>Rooms {login}</RoomsDashboardHeading>
      <ButtonWrapper>
        <CreateRoomButton type='submit' onClick={handleSumbit}>
          <CreateRoomIconWrapper>
            <Plus />
          </CreateRoomIconWrapper>
          Create room
        </CreateRoomButton>
        <JoinButton onClick={() => navigate(joinRoomPagePath)}>
          Join
        </JoinButton>
        <PageButton onClick={() => dispatch(clearAccountData())}>
          Exit
        </PageButton>
      </ButtonWrapper>
      {rooms && (
        <RoomsTable
          rooms={rooms}
        />
      )}
    </RoomsDashboardWrapper>
  );
}

export default RoomsDashboard;
