import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logIntoAccount, registerAccount } from '../../api/account/api';
import { PrimaryButton } from '../../components/common/Button';
import { Form, Label } from '../../components/common/Form';
import { ErrorSpan } from '../../components/common/Span';
import { useAppDispatch } from '../../hooks/redux';
import { setAccountData } from '../../store/account/actions';
import { getErrorMessage } from '../../utils/error';
import { homePagePath, roomsDashboardPath } from '../../utils/paths';
import { loginPath } from '../../utils/paths';


const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type RegisterInputData = {
  nickname: string;
  login: string;
  password: string;
};
const initialLoginInputData: RegisterInputData = {
  nickname: '',
  login: '',
  password: '',
};

export function RegisterPage() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterInputData>(
    initialLoginInputData,
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const token = await registerAccount( registerData.login, registerData.password, registerData.nickname, );

      setError(null);
      dispatch(setAccountData({ token, login: registerData.login }));
      navigate(roomsDashboardPath);
    } catch (e) {
      console.error(e);
      setError(getErrorMessage(e));
    }
  }

  return (
    <LoginWrapper>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Label>
          Login:
          <input
            type={'text'}
            id='login'
            name='login'
            value={registerData.login}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          Password:
          <input
            type={'text'}
            id='password'
            name='password'
            value={registerData.password}
            onChange={handleInputChange}
          />
        </Label>
        <Label>
          Nickname:
          <input
            type={'text'}
            id='nickname'
            name='nickname'
            value={registerData.nickname}
            onChange={handleInputChange}
          />
        </Label>
        <PrimaryButton type='submit'>Submit</PrimaryButton>
        <PrimaryButton type='button' onClick={() => navigate(homePagePath)}>Close</PrimaryButton>
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </Form>
    </LoginWrapper>
  );
}
