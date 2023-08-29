import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  uuid: string;
  title: string;
  content: string;
  dateCreated: string;
}

interface NoteSliceState {
  state: "loading" | "idle" | "error";
  searchTerm: string;
  notes: Note[];
  errorMessage: string;
}

const initialState: NoteSliceState = {
  state: "idle",
  searchTerm: "",
  notes: [],
  errorMessage: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.uuid !== action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.notes.map((note) =>
        note.uuid === action.payload.uuid ? action.payload : note,
      );
    },
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});
