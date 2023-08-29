"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
// TODO: Responsiveness
import { useSelector, useDispatch } from "@/lib/redux/store";
import { selectNotes, noteSlice } from "@/lib/redux/slices/noteSlice";

import NoteComponent from "./Note";

export default function Notes() {
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();

  const sortedNotes = [...notes].sort((a, b) =>
    new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1,
  );

  return (
    <div className="my-8 flex flex-wrap gap-x-4 gap-y-6">
      <AnimatePresence>
        {sortedNotes.map((note) => (
          <NoteComponent
            key={note.uuid}
            note={note}
            selectedCardId={selectedCardId}
            selectCard={() => setSelectedCardId(note.uuid)}
            unSelectCard={() => setSelectedCardId("")}
            deleteNote={() => dispatch(noteSlice.actions.removeNote(note.uuid))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
