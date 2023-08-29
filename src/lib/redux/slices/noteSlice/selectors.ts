import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

import type { ReduxState } from "@/lib/redux/store";

export const selectNotes = createSelector(
  [
    (state: ReduxState) => state.note.notes,
    (state: ReduxState) => state.note.searchTerm,
  ],
  (notes, searchTerm) => {
    if (searchTerm) {
      const fuse = new Fuse(notes, {
        keys: ["title", "content"],
        useExtendedSearch: true,
      });
      return fuse.search(`'${searchTerm}`).map((result) => result.item);
    }
    return notes;
  },
);
