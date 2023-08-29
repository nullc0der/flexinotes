import React from "react";

import { format } from "date-fns";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, Edit3 } from "react-feather";

import type { Note } from "@/lib/redux/slices/noteSlice";
import { getRandomNumber } from "@/lib/utils";

type NoteProps = {
  note: Note;
  selectedCardId: string;
  selectCard: () => void;
  unSelectCard: () => void;
  deleteNote: () => void;
};

export default function NoteComponent({
  note,
  selectedCardId,
  selectCard,
  unSelectCard,
  deleteNote,
}: NoteProps) {
  const itemWidth = React.useMemo(() => getRandomNumber(250, 350), []);
  const noteOpen = selectedCardId === note.uuid;
  const cardClasses = {
    common: "relative",
    open: "z-[41] h-[250px] w-[450px] top-[30%]",
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
        width: `${itemWidth}px`,
      }}
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
          <motion.h2 layout="preserve-aspect" className="text-xl font-bold">
            {note.title}
          </motion.h2>
          <Divider className="mt-2" />
          <motion.p
            layout="preserve-aspect"
            className="text-md mt-2 font-normal"
          >
            {note.content}
          </motion.p>
          <motion.div
            layout="preserve-aspect"
            className="absolute -bottom-2 right-2"
          >
            <Button size="sm" isIconOnly className="mr-2" onPress={deleteNote}>
              <Trash2 size={14} />
            </Button>
            <Button size="sm" isIconOnly>
              <Edit3 size={14} />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
