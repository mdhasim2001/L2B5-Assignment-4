import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: 0,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export default bookSlice.reducer;
