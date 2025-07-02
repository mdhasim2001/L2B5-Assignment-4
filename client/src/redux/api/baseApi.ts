import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-puce-seven.vercel.app",
    // baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["books"],
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    createBook: build.mutation({
      query: (bookData) => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} = baseApi;
