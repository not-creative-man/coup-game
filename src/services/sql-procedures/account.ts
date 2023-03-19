import { proceduresApi } from './helper';

const { useCallProcedureQuery } = proceduresApi;

export function useSqlLogin(login: string, password: string) {
  return useCallProcedureQuery({ method: 'login', param1: login, param2: password });
}
