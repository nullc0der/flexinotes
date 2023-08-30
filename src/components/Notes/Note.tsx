import React from "react";
import { useMediaQuery } from "react-responsive";

import { format } from "date-fns";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Edit3 } from "react-feather";
import ReactMarkdown from "react-markdown";

import type { Note } from "@/lib/redux/slices/noteSlice";
import { getRandomNumber } from "@/lib/utils";

type NoteProps = {
  note: Note;
  selectedCardId: string;
  selectCard: () => void;
  unSelectCard: () => void;
  deleteNote: () => void;
  editNote: () => void;
};

export default function NoteComponent({
  note,
  selectedCardId,
  selectCard,
  unSelectCard,
  deleteNote,
  editNote,
}: NoteProps) {
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const itemWidth = React.useMemo(() => getRandomNumber(250, 350), []);
  const noteOpen = selectedCardId === note.uuid;
  const cardClasses = {
    common: "relative",
    open: `z-[41] h-[250px] top-[30%] ${isMd ? "w-[450px]" : "w-full"}`,
    close: "h-full w-full",
  };
  const cardContentClasses = {
    common: "h-full w-full rounded-lg bg-default-100 p-4 cursor-pointer",
    open: "overflow-x-hidden overflow-y-scroll",
    close: "overflow-hidden",
  };

  return (
    // Card Container
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      style={{
        height: "150px",
        width: isMd ? `${itemWidth}px` : "100%",
      }}
      className="mx-4 my-4"
      onClick={!noteOpen ? selectCard : () => {}}
    >
      {/* Overlay */}
      <AnimatePresence>
        {!!noteOpen && (
          <motion.div
            onClick={unSelectCard}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[41] h-full w-full bg-black"
          />
        )}
      </AnimatePresence>
      {/* Card */}
      <motion.div
        layout
        className={
          noteOpen
            ? `${cardClasses.common} ${cardClasses.open}`
            : `${cardClasses.common} ${cardClasses.close}`
        }
      >
        {/* Card Content */}
        <div
          className={
            noteOpen
              ? `${cardContentClasses.common} ${cardContentClasses.open}`
              : `${cardContentClasses.common} ${cardContentClasses.close}`
          }
        >
          <motion.div
            layout="preserve-aspect"
            className="absolute -top-2 right-2 rounded-lg bg-default-200 p-1"
          >
            <p className="text-xs font-thin">
              Date Created:{" "}
              {format(new Date(note.dateCreated), "dd/MM/yyyy h:mm aaa")}
            </p>
          </motion.div>
          {!!note.title && (
            <motion.h2 layout="preserve-aspect" className="text-xl font-bold">
              {note.title}
            </motion.h2>
          )}
          {!!(note.title && note.content) && <Divider className="mt-2" />}
          {!!note.content && (
            <motion.div layout="preserve-aspect" className="mt-2">
              {/* TODO: Add styling for elements */}
              <ReactMarkdown className="prose dark:prose-invert prose-headings:m-0 prose-p:m-0 prose-hr:my-2">
                {note.content}
              </ReactMarkdown>
            </motion.div>
          )}
          <motion.div
            layout="preserve-aspect"
            className="absolute -bottom-2 right-2"
          >
            <Button
              size="sm"
              isIconOnly
              className="mr-2"
              onClick={(e) => {
                e.nativeEvent.stopImmediatePropagation();
                deleteNote();
              }}
            >
              <Trash2 size={14} />
            </Button>
            <Button
              size="sm"
              isIconOnly
              onClick={(e) => {
                if (noteOpen) unSelectCard();
                e.nativeEvent.stopImmediatePropagation();
                editNote();
              }}
            >
              <Edit3 size={14} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
