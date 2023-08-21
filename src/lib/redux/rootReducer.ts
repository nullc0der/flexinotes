import { combineReducers } from "@reduxjs/toolkit";
import { noteSlice } from "./slices/noteSlice/noteSlice";

export const reducer = combineReducers({
  note: noteSlice.reducer,
});
