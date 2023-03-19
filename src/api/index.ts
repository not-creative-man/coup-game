import axios, { AxiosResponse } from 'axios';
import { dataBaseNumber } from '../constants/database';

axios.defaults.baseURL = 'https://sql.lavro.ru/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(params: any) =>
    axios.get<T>('call.php', { params }).then(responseBody),
  // post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  // put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  // del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export type ErrorResponse = {
  RESULTS: [{ error?: [string] }];
};

type SqlErrorResponse = { ERROR: any };

export type RunProcedureParams = { p1: string; p2?: string; p3?: string; p4?: string | number };

export type RunProcedureOptions = {
  param1?: string | number | null;
  param2?: string | number | null;
  param3?: string | number | null;
  param4?: string | number | null;
  format?: 'rows' | 'rows_compact' | 'columns' | 'columns_compact' | 'table';
  results?: 'array' | 'object';
};

export async function runProcedure<T>( name: string, options?: RunProcedureOptions, ): Promise<T> {
  const {
    param1,
    param2,
    param3,
    param4,
    format = 'columns_compact',
    results,
  } = options ?? {};

  console.log(options);

  const response = await requests.get<T>({
    db: dataBaseNumber,
    pname: name,
    p1: param1,
    p2: param2,
    p3: param3,
    p4: param4,
    format: format,
    results: results,
  });

  // console.log(response);

  const sqlError = (response as SqlErrorResponse).ERROR;
  if (sqlError) {
    requests.get<T>({
      db: dataBaseNumber,
      pname: 'markError',
      p1: 'React: ' + sqlError,
    });
    console.error('SQL Error', sqlError);
  }

  const errorResponse = (response as ErrorResponse).RESULTS[0].error;
  if (errorResponse) throw new Error(errorResponse[0]);

  return response;
}

export const helperApi = {
  help: () => requests.get({ db: dataBaseNumber, pname: 'help' }),
};

export const authorizationError = { error: ['Authorization error'] };
