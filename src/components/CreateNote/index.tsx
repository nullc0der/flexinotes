"use client";

import React, { useState } from "react";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

import useClickOutside from "@/lib/hooks/useClickOutside";
import { CloseIcon } from "./CloseIcon";

type Note = typeof initialValues;

const initialValues = { title: "", content: "" };

export default function CreateNote() {
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
      console.log(note);
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
        {!showFull ? (
          <Input
            radius="full"
            placeholder="Add a note"
            onClick={() => setShowFull(!showFull)}
          />
        ) : (
          <div className="flex flex-col gap-2" ref={ref}>
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
                <CloseIcon size={18} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
