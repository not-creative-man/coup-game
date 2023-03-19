import { useState } from 'react';
import { X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { enterRoom } from '../../../api/rooms/api';
import { PrimaryButton } from '../../../components/common/Button';
import { Label } from '../../../components/common/Form';
import { ErrorSpan } from '../../../components/common/Span';
import { colors } from '../../../constants/theme';
import { useToken } from '../../../store/account/hooks';
import { getErrorMessage } from '../../../utils/error';
import { roomPath } from '../../../utils/paths';

const PasswordModalWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);
`;

const PasswordModalWindow = styled.div`
  position: fixed;

  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  min-width: 25rem;
  min-height: 20rem;

  padding: 1rem 2rem;
  margin: 0 auto;

  background-color: ${colors.bg1};
  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const CloseModalIconWrapper = styled.div`
  position: absolute;

  top: 1rem;
  right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const FlexForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

type PassworModalInputData = {
  password: string;
};

const defaultInputData: PassworModalInputData = {
  password: '',
};

type PasswordModalProps = {
  roomCode: string;
  closeModal: () => void;
};

export function PasswordModal({ roomCode, closeModal }: PasswordModalProps) {
  const [inputData, setInputData] =
    useState<PassworModalInputData>(defaultInputData);
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
        await enterRoom(token, roomCode,);
        navigate(roomPath(roomCode));
        closeModal();
      } catch (e) {
        setError(getErrorMessage(e));
      }
    })();
  }

  return (
    <PasswordModalWrapper>
      <PasswordModalWindow>
        <CloseModalIconWrapper onClick={closeModal}>
          <X />
        </CloseModalIconWrapper>
        <h2>Room {roomCode}</h2>
        <FlexForm onSubmit={handleEnterRoom}>
          <Label>
            Enter room password to continue
            <input
              type={'text'}
              id='password'
              name='password'
              value={inputData.password}
              onChange={handleInputChange}
            />
          </Label>
          <PrimaryButton type='submit' disabled={!inputData.password}>
            Enter room
          </PrimaryButton>
          <ErrorSpan>{error}</ErrorSpan>
        </FlexForm>
      </PasswordModalWindow>
    </PasswordModalWrapper>
  );
}
