import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => "/api/books",
    }),
  }),
});

export const { useGetBooksQuery } = baseApi;
