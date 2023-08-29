"use client";

import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { v4 as uuid4 } from "uuid";
import { XSquare } from "react-feather";

import useClickOutside from "@/lib/hooks/useClickOutside";
import { useDispatch } from "@/lib/redux/store";
import { noteSlice } from "@/lib/redux/slices/noteSlice";

type Note = typeof initialValues;

const initialValues = { title: "", content: "" };

export default function CreateNote() {
  const dispatch = useDispatch();
  const [note, setNote] = useState<Note>(initialValues);
  const [showFull, setShowFull] = useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const onChangeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const saveCleanAndHide = () => {
    if (note.title || note.content) {
      dispatch(
        noteSlice.actions.addNote({
          title: note.title,
          content: note.content,
          dateCreated: new Date().toISOString(),
          uuid: uuid4(),
        }),
      );
    }
    cleanAndHide();
  };

  const cleanAndHide = () => {
    setNote(initialValues);
    setShowFull(false);
  };

  useClickOutside(ref, saveCleanAndHide);

  return (
    <div className="mt-8 flex justify-center">
      <div className="basis-1/2">
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
              <motion.p layout="preserve-aspect" className="text-sm font-light">
                Create a new note
              </motion.p>
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
                value={note.title}
                onChange={onChangeNote}
                name="title"
              />
              <Textarea
                label="Content"
                value={note.content}
                onChange={onChangeNote}
                description="MarkDown is supported"
                name="content"
              />
              <Divider className="mx-auto my-2 w-3/4" />
              <div className="flex justify-end gap-2">
                <Button variant="flat" radius="full" onClick={saveCleanAndHide}>
                  Create
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
