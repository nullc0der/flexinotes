import { type ReduxState } from "@/lib/redux/store";

export const selectNotes = (state: ReduxState) => state.note.notes;
