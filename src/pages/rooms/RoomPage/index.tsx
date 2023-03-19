import { useEffect } from 'react';
import { Star } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { startGame } from '../../../api/game/api';
import { getRoomState, leaveRoom } from '../../../api/rooms/api';
import { PrimaryButton } from '../../../components/common/Button';
import { colors } from '../../../constants/theme';
import { useAppDispatch } from '../../../hooks/redux';
import { useAccountLogin, useToken } from '../../../store/account/hooks';
import { saveRoomState } from '../../../store/room/actions';
import { useRoomState } from '../../../store/room/hooks';
import { gamePath, roomsDashboardPath } from '../../../utils/paths';
import NotFound from '../../errors/NotFound';

const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
    align-items: center;
`;

const RoomJoinWrapper = styled.div`
  display: flex;
`;

export function RoomPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { code } = useParams();
  const token = useToken();
  const login = useAccountLogin();

  const roomState = useRoomState();

  function handleLeaveRoom() {
    if (!token || !code) return;

    leaveRoom(token, code);
    navigate(roomsDashboardPath);
  }

  function handleStartGame() {
    if (!token || !code) return;

    console.log(token);
    console.log(code);

    (async function () {
      await startGame(token, code);
      navigate(gamePath(code));
    })();
  }

  useEffect(() => {
    if (!code || !roomState?.hasGameStarted) return;

    navigate(gamePath(code));
  }, [roomState?.hasGameStarted, code, navigate]);

  useEffect(() => {
    if (!token || !code) return;

    async function updateRoomState(token: string, code: string) {
      try {
        // console.log("here still work");
        const roomState = await getRoomState(token, code);
        // console.log(roomState);
        dispatch(saveRoomState({ roomState, code }));
      } catch (e) {
        console.error(e);
      }
    }

    updateRoomState(`${token}`, code);

    const updateRoomStateInterval = setInterval(
      () => updateRoomState(token, code),
      5000,
    );

    return () => clearInterval(updateRoomStateInterval);
  }, [token, code, dispatch]);

  if (!code) return <NotFound />;
  if (!roomState) return <span>Loading</span>;

  const { members } = roomState;
  const admin = members.find((member) => member.isAdmin);
  const canStartGame = members.length >= 2;

  return (
    <Wrapper>
      <h1>Room {code}</h1>
      <h2>Room members: </h2>
      <ul>
        {members.map((member) => (
          <li key={`room-member-${member.nickname}`}>
            {member.nickname}{' '}
            {member.isAdmin && (
              <Star color={colors.primary} fill={colors.primary} />
            )}
          </li>
        ))}
      </ul>
      <RoomJoinWrapper>
        <PrimaryButton onClick={() => navigate(roomsDashboardPath)}>Back</PrimaryButton>
        {admin?.login === login ? (
          <>
            <PrimaryButton onClick={handleStartGame} disabled={!canStartGame}>
              Start game
            </PrimaryButton>
            {!canStartGame && (
              <span>Should be at least 2 people to start the game</span>
            )}
          </>
        ) : (
          <PrimaryButton onClick={handleLeaveRoom}>Leave</PrimaryButton>
        )}
      </RoomJoinWrapper>
      
    </Wrapper>
  );
}
