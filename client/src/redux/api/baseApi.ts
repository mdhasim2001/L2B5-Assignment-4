import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-puce-seven.vercel.app",
  }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/api/books",
    }),
  }),
});

export const { useGetBooksQuery } = baseApi;
