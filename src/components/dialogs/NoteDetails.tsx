import React from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/Button";
import { Note } from "@/types";

interface NoteDetailsProps {
  open: boolean;
  onClose: () => void;
  note: Note | null;
}

const NoteDetails = ({ open, onClose, note }: NoteDetailsProps) => {
  const closeDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  if (open && note) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeDialog}>
        <div className="flex flex-col gap-4 p-4 rounded-md bg-slate-100 dark:bg-slate-950 border-2 border-slate-800 max-w-sm">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p className="text-sm whitespace-pre-line">{note.content}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {new Date(note.timestamp).toLocaleDateString(undefined, {
                year: "numeric", month: "numeric", day: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
              })}
            </p>
            <Button
              onClick={closeDialog}
              variant="ghost"
              fullWidth={false}
            >
              Close
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return null;
};

export {
  NoteDetails
};