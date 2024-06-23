import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RowData } from '../types'
import { setRows, addRow, deleteRow, editRow } from '../rowsSlice'

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
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(deleteRow(id))
        } catch (error) {
          console.error('Failed to delete row:', error)
        }
      },
    }),
  }),
})

export const { useGetRowsQuery, useAddRowMutation, useDeleteRowMutation } = api
