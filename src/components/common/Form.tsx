import styled from 'styled-components';
import { PrimaryButton } from './Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const Input = styled.input`
  background: white;
  border-radius: 20px;
  width: 520px;
  height: 50px;
  font-size: 20px;
`;

export const Button = styled(PrimaryButton)`
  width: 200px;
  height: 50px;
  margin: 0;
  margin-bottom: 10px;
`;