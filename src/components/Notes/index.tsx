"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "@/lib/redux/store";
import { selectNotes, noteSlice } from "@/lib/redux/slices/noteSlice";
import { uiSlice } from "@/lib/redux/slices/uiSlice";

const NoteComponent = dynamic(() => import("./Note"));

export default function Notes() {
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();

  const sortedNotes = [...notes].sort((a, b) =>
    new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1,
  );

  return (
    <div className="flex flex-wrap justify-center pb-16 pt-4 md:justify-start">
      <AnimatePresence>
        {sortedNotes.map((note) => (
          <NoteComponent
            key={note.uuid}
            note={note}
            selectedCardId={selectedCardId}
            selectCard={() => setSelectedCardId(note.uuid)}
            unSelectCard={() => setSelectedCardId("")}
            deleteNote={() => dispatch(noteSlice.actions.removeNote(note.uuid))}
            editNote={() => {
              dispatch(uiSlice.actions.updateEditingNoteId(note.uuid));
              document
                .querySelector("#createNoteForm")!
                .scrollIntoView({ behavior: "smooth" });
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
