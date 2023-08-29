import { combineReducers } from "@reduxjs/toolkit";
import { noteSlice } from "./slices/noteSlice";
import { uiSlice } from "./slices/uiSlice";

export const reducer = combineReducers({
  note: noteSlice.reducer,
  ui: uiSlice.reducer,
});
