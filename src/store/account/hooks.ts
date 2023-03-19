import { useAppSelector } from '../../hooks/redux';

export function useToken() {
  return useAppSelector((state) => state.account.token);
}

export function useAccountLogin() {
  return useAppSelector((state) => state.account.login);
}
