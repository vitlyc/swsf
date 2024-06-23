import { setRows, addNewRow, deleteRow, updateRow } from '../rowsSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RowData } from '../types'

const baseUrl: string = import.meta.env.VITE_BASE_URL
const userID: string = import.meta.env.VITE_USER_ID

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  reducerPath: 'api',
  tagTypes: ['List'],
  endpoints: (build) => ({
    getRows: build.query<RowData[], void>({
      query: () => '/row/list',
    }),
    addRow: build.mutation<{ current: RowData }, Partial<RowData>>({
      query: (body) => ({
        url: '/row/create',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data.current)
          dispatch(addNewRow({ newRow: data.current }))
        } catch (error) {
          console.error('Failed to create row:', error)
        }
      },
    }),
    deleteRow: build.mutation<
      { current: null; changed: RowData[] },
      { id: number }
    >({
      query: ({ id }) => ({
        url: `/row/${id}/delete`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.current === null) {
            dispatch(deleteRow(id))
            console.log('Changed rows:', data.changed)
          }
        } catch (error) {
          console.error('Failed to delete row:', error)
        }
      },
    }),
    updateRow: build.mutation<RowData, Partial<RowData> & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `/row/${id}/update`,
        method: 'POST',
        body,
      }),
      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled }) {
        console.log({ id, ...body })

        try {
          const { data } = await queryFulfilled
          console.log('Updated row:', data)
          dispatch(updateRow({ id, updatedData: data }))
        } catch (error) {
          console.error('Failed to update row:', error)
        }
      },
    }),
  }),
})

export const {
  useGetRowsQuery,
  useAddRowMutation,
  useDeleteRowMutation,
  useUpdateRowMutation,
} = api
