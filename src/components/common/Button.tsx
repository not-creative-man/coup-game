import { darken } from 'polished';
import styled from 'styled-components';
import { colors } from '../../constants/theme';

export const PrimaryButton = styled.button`
  padding: 0.5rem 1rem;

  color: ${colors.textAlter};
  background-color: ${colors.primary};

  font-size: 18px;
  font-family: "Arial";

  border: none;
  border-radius: 20px;

  margin-right: 10px;

  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, colors.primary)};
    background-color: ${darken(0.05, colors.primary)};
  }
  &:hover {
    background-color: ${darken(0.05, colors.primary)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, colors.primary)};
    background-color: ${darken(0.1, colors.primary)};
  }
  &:disabled {
    background-color: ${darken(0.2, colors.primary)};
    color: ${darken(0.26, colors.primary)};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`;
