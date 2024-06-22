import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RowData } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'api',
  tagTypes: ['List'],
  endpoints: (build) => ({
    getList: build.query<RowData[], void>({
      query: () => 'row/list',
      providesTags: ['List'],
    }),
  }),
})
