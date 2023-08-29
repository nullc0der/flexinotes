import type { ReduxState } from "@/lib/redux/store";

export const selectEditingNoteId = (state: ReduxState) =>
  state.ui.editingNoteId;
