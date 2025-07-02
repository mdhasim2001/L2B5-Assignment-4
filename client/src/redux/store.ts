import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./featuers/books/bookSlice";
import borrowSlice from "./featuers/borrow/borrowSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    books: bookSlice,
    borrow: borrowSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
