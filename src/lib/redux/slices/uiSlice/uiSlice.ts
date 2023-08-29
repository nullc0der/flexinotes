import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UISliceState {
  searchTerm: string;
  editingNoteId: string;
}

const initialState: UISliceState = {
  searchTerm: "",
  editingNoteId: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateEditingNoteId: (state, action: PayloadAction<string>) => {
      state.editingNoteId = action.payload;
    },
  },
});
