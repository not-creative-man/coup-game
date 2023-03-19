import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { dataBaseNumber } from '../../constants/database';
import { ProcedureErrorResult, SqlError } from '../../models/sql-responses';

type CallPhpParams = {
  method: string;
  param1?: string;
  param2?: string;
  param3?: string;
};

export const proceduresApi = createApi({
  reducerPath: 'proceduresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://sql.lavro.ru/' }),
  endpoints: (build) => ({
    callProcedure: build.query<ProcedureErrorResult | SqlError, CallPhpParams>({
      query: ({ method, param1, param2, param3 }) => ({
        url: 'call.php',
        params: { db: dataBaseNumber, pname: method, p1: param1, p2: param2, p3: param3 },
      }),
    }),
  }),
});
