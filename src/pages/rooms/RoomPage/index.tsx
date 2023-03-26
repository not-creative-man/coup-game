import { useEffect } from 'react';
import { Star } from 'react-feather';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { startGame } from '../../../api/game/api';
import { getRoomState, leaveRoom } from '../../../api/rooms/api';
import { PrimaryButton } from '../../../components/common/Button';
import { DashboardWrapper, DashboardH1, DashboardHeading, DashboardLogo, WrapperBackground } from '../../../components/common/PageStyling';
import { colors } from '../../../constants/theme';
import { useAppDispatch } from '../../../hooks/redux';
import { useAccountLogin, useToken } from '../../../store/account/hooks';
import { saveRoomState } from '../../../store/room/actions';
import { useRoomState } from '../../../store/room/hooks';
import { gamePath, roomsDashboardPath } from '../../../utils/paths';
import NotFound from '../../errors/NotFound';
import exit from '../../../utils/Pictures/icons/exit.png';

const Wrapper = styled(DashboardWrapper)`
  margin: auto;
  gap: 0;
  height: 1020px;
  display: flex;
  flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const RoomJoinWrapper = styled.div`
  display: flex;
`;

const ExitButton = styled.button`
  background-color: none;
  border: 0;
  cursor: pointer;
  // border: 1px solid #3498db;
  background-color: transparent;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const RoomsSpan = styled.span`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;

color: #000000;

margin-left: 50px;
`;

const Button = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  vertical-align: middle;

  width: 217px;
  height: 39px;

  background: #D51515;
  border-radius: 20px;
  justify-content: center;
  margin-right: 50px;
  // margin-bottom: 1rem;
  // margin-right: 10px;
`;

const JoinH2 = styled.h2`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;
/* identical to box height */

margin: 50px auto 25px 50px;

color: #757373;
`;

const Ul = styled.ul`
  margin-left: 0;
  padding-left: 0;
  
  & > li{
    list-style-type: none;
    margin-left: 50px;
  }
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
      <DashboardHeading>
        <DashboardLogo>
          <DashboardH1>
            ПЕРЕВОРОТ
          </DashboardH1>
        </DashboardLogo>
        <ExitButton onClick={handleLeaveRoom}>
          <img src={exit} alt='Exit' />
        </ExitButton>
      </DashboardHeading>
      <WrapperBackground>
        <ButtonWrapper>
            <RoomsSpan>
              КОМНАТЫ {code}
            </RoomsSpan>
            {admin?.login === login ? (
            <>
              <Button onClick={handleStartGame} disabled={!canStartGame}>
                Start game
              </Button>
              {!canStartGame && (
                <span>Should be at least 2 people to start the game</span>
              )}
            </>
          ) : (
            <Button onClick={() => navigate(roomsDashboardPath)}>Back</Button>
          )}
          </ButtonWrapper>
        <JoinH2>УЧАСТНИКИ</JoinH2>
        <Ul>
          {members.map((member) => (
            <li key={`room-member-${member.nickname}`}>
              {member.nickname}{' '}
              {member.isAdmin && (
                <Star color={colors.primary} fill={colors.primary} />
              )}
            </li>
          ))}
        </Ul>
        <RoomJoinWrapper>
          
          
        </RoomJoinWrapper>
      </WrapperBackground>
    </Wrapper>
  );
}
