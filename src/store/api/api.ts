import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RowData } from '../types'

const baseUrl = import.meta.env.VITE_BASE_URL
const userID = import.meta.env.VITE_USER_ID

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  reducerPath: 'api',
  tagTypes: ['List'],
  endpoints: (build) => ({
    getRows: build.query<RowData[], void>({
      query: () => '/row/list',
    }),
    addRow: build.mutation<RowData, Partial<RowData>>({
      query: (body) => ({
        url: '/row/create',
        method: 'POST',
        body,
      }),
    }),
    deleteRow: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/row/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetRowsQuery, useAddRowMutation, useDeleteRowMutation } = api
