import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logIntoAccount } from '../../api/account/api';
import { PrimaryButton } from '../../components/common/Button';
import { Form, Label } from '../../components/common/Form';
import { ErrorSpan } from '../../components/common/Span';
import { useAppDispatch } from '../../hooks/redux';
import { setAccountData } from '../../store/account/actions';
import { getErrorMessage } from '../../utils/error';
import { homePagePath, roomsDashboardPath } from '../../utils/paths';

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type LoginInputData = {
  login: string;
  password: string;
};
const initialLoginInputData: LoginInputData = {
  login: '',
  password: '',
};

export function LoginPage() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginInputData>(
    initialLoginInputData,
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const token = await logIntoAccount(loginData.login, loginData.password);

      setError(null);
      dispatch(setAccountData({ token, login: loginData.login }));
      console.log(token);
      navigate(roomsDashboardPath);
    } catch (e) {
      console.error(e);
      setError(getErrorMessage(e));
    }
  }

  return (
    <LoginWrapper>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Label>
          Login:
          <input type={'text'} id='login' name='login' value={loginData.login} onChange={handleInputChange} />
        </Label>
        <Label>
          Password:
          <input type={'text'} id='password' name='password' value={loginData.password} onChange={handleInputChange} />
        </Label>
        <PrimaryButton type='submit'>Submit</PrimaryButton>
        <PrimaryButton type='button' onClick={() => navigate(homePagePath)}>Close</PrimaryButton>
        {error && <ErrorSpan>{error}</ErrorSpan>}
      </Form>
    </LoginWrapper>
  );
}
