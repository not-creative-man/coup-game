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
import exit from '../../../utils/Pictures/icons/exit.png';
import { DashboardWrapper, DashboardHeading, DashboardLogo, DashboardH1, WrapperBackground } from '../../../components/common/PageStyling';

const RoomsDashboardWrapper = styled(DashboardWrapper)``;

const RoomsDashboardHeading = styled(DashboardHeading)``;

const RoomsDashboardLogo = styled(DashboardLogo)``;

const RoomsDashboardH1 = styled(DashboardH1)``;

const RoomTableBackground = styled(WrapperBackground)``;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const CreateRoomButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;

  width: 217px;
  height: 39px;

  background: #D51515;
  border-radius: 20px;
  justify-content: center;
  // margin-bottom: 1rem;
  // margin-right: 10px;
`;
const CreateRoomIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4px;
`;

const RoomsSpan = styled.span`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;

color: #000000;
`;

const ExitButton = styled.button`
  background-color: none;
  border: 0;
  cursor: pointer;
  // border: 1px solid #3498db;
  background-color: transparent;
`;

// const PageButton = styled(PrimaryButton)`
//   display: flex;
//   align-items: center;
//   vertical-align: middle;
//   margin-bottom: 1rem;
//   margin-right: 10px;
// `

const JoinButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;
  width: 124px;
  height: 39px;
  
  background: #D51515;
  border-radius: 20px;
  justify-content: center;
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
      <RoomsDashboardHeading>
        <RoomsDashboardLogo>
          <RoomsDashboardH1>
            ПЕРЕВОРОТ
          </RoomsDashboardH1>
        </RoomsDashboardLogo>
        <ExitButton onClick={() => dispatch(clearAccountData())}>
          <img src={exit} />
        </ExitButton>
      </RoomsDashboardHeading>
      <RoomTableBackground>
        <ButtonWrapper>
          <RoomsSpan>
            КОМНАТЫ
          </RoomsSpan>
          <ButtonWrapper>
            <CreateRoomButton type='submit' onClick={handleSumbit}>
              <CreateRoomIconWrapper>
                <Plus />
              </CreateRoomIconWrapper>
              Create room
            </CreateRoomButton>
          </ButtonWrapper>
        </ButtonWrapper>
        {rooms && (
          <RoomsTable
            rooms={rooms}
          />
        )}
      </RoomTableBackground>
      
    </RoomsDashboardWrapper>
  );
}

export default RoomsDashboard;
