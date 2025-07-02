import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrow: 0,
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {},
});

export default borrowSlice.reducer;
