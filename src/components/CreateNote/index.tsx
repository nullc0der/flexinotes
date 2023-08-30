"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { v4 as uuid4 } from "uuid";
import { XSquare } from "react-feather";

import useClickOutside from "@/lib/hooks/useClickOutside";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { noteSlice, selectEditingNote } from "@/lib/redux/slices/noteSlice";
import { uiSlice } from "@/lib/redux/slices/uiSlice";

type NoteForm = typeof initialValues;

const initialValues = { title: "", content: "" };

export default function CreateNote() {
  const dispatch = useDispatch();
  const editingNote = useSelector(selectEditingNote);

  const [noteForm, setNoteForm] = useState<NoteForm>(initialValues);
  const [showFull, setShowFull] = useState<boolean>(false);
  const [isEditingNote, setIsEditingNote] = useState<boolean>(false);

  useEffect(() => {
    if (editingNote) {
      setNoteForm({
        title: editingNote.title,
        content: editingNote.content,
      });
      setIsEditingNote(true);
      setShowFull(true);
    }
  }, [editingNote]);

  const ref = React.useRef<HTMLDivElement>(null);

  const onChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteForm({
      ...noteForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveCleanAndHide = () => {
    if (noteForm.title || noteForm.content) {
      isEditingNote && editingNote
        ? dispatch(
            noteSlice.actions.updateNote({
              ...editingNote,
              title: noteForm.title,
              content: noteForm.content,
            }),
          )
        : dispatch(
            noteSlice.actions.addNote({
              title: noteForm.title,
              content: noteForm.content,
              dateCreated: new Date().toISOString(),
              uuid: uuid4(),
            }),
          );
    }
    cleanAndHide();
  };

  const cleanAndHide = () => {
    setNoteForm(initialValues);
    setShowFull(false);
    if (isEditingNote) {
      setIsEditingNote(false);
      dispatch(uiSlice.actions.updateEditingNoteId(""));
    }
  };

  useClickOutside(ref, saveCleanAndHide);

  return (
    <div className="mt-8 flex justify-center" id="createNoteForm">
      <div className="basis-full px-4 md:basis-1/2 md:px-0">
        <AnimatePresence mode="wait">
          {!showFull ? (
            <motion.div
              key={`form-showfull-${showFull}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer rounded-md bg-default-100 p-4"
              onClick={() => setShowFull(true)}
            >
              <p className="text-sm font-light">Create a new note</p>
            </motion.div>
          ) : (
            <motion.div
              key={`form-showfull-${showFull}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
              ref={ref}
            >
              <Input
                label="Title"
                value={noteForm.title}
                onChange={onChangeNote}
                name="title"
              />
              <Textarea
                label="Content"
                value={noteForm.content}
                onChange={onChangeNote}
                description="MarkDown is supported"
                name="content"
              />
              <Divider className="mx-auto my-2 w-3/4" />
              <div className="flex justify-end gap-2">
                <Button variant="flat" radius="full" onClick={saveCleanAndHide}>
                  {isEditingNote ? "Update" : "Create"}
                </Button>
                <Button
                  variant="flat"
                  radius="full"
                  isIconOnly
                  onClick={cleanAndHide}
                >
                  <XSquare size={18} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
