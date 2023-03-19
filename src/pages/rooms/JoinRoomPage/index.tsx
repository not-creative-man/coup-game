import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { enterRoom } from '../../../api/rooms/api';
import { PrimaryButton } from '../../../components/common/Button';
import { Form, Label } from '../../../components/common/Form';
import {  useToken } from '../../../store/account/hooks';
import { getErrorMessage } from '../../../utils/error';
import {  roomPath, roomsDashboardPath } from '../../../utils/paths';
import { ErrorSpan } from '../../../components/common/Span';

const JoinRoomForm = styled(Form)`
  max-width: 500px;
  margin: 0 auto;
`;

type JoinRoomInputData = {
  roomCode: string;
};

const defaultInputData: JoinRoomInputData = {
  roomCode: '',
};
  
export function JoinRoomPage() {
  const [inputData, setInputData] =
    useState<JoinRoomInputData>(defaultInputData);
  const [error, setError] = useState('');
  const token = useToken();
  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }

  function handleEnterRoom(event: React.FormEvent) {
    event.preventDefault();

    if (!token) return;

    setError('');

    (async function () {
      try {
        await enterRoom(token, inputData.roomCode,);
        navigate(roomPath(inputData.roomCode));
      } catch (e) {
        setError(getErrorMessage(e));
      }
    })();
  }

  return (
    <div>
      <h1>Join room</h1>
      <JoinRoomForm onSubmit={handleEnterRoom}>
        <Label>
          Room code:
          <input
            type='text'
            name='roomCode'
            id='roomCode'
            onChange={handleInputChange}
          />
        </Label>

        <PrimaryButton type='submit'>
          Join
        </PrimaryButton>
        {error && <ErrorSpan>{error}</ErrorSpan>}
        <PrimaryButton type='button' onClick={() => navigate(roomsDashboardPath)}>
          Back
        </PrimaryButton>
      </JoinRoomForm>
    </div>
  );
}

