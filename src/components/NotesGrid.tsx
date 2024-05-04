'use client'
import React, { useState } from "react";
import { LoaderCircle, Notebook } from "lucide-react";

import { useNotes } from "@/context/NotesContext";
import { NoteCard } from "@/components/NoteCard";
import { Note } from "@/types";
import { NoteDetails } from "./dialogs/NoteDetails";

const NotesGrid = () => {
  const { notes } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  if (!notes) {
    return (
      <div className="grow flex items-center">
        <LoaderCircle
          className="animate-spin"
          size={48} />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="grow flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <Notebook size={48} />
          You don&apos;t have any note yet, create your first one!
        </div>
      </div>
    );
  }

  return (
    <div className="grow columns-1 sm:columns-2 md:columns-3 gap-4 mb-4 p-2 sm:p-0">
      {notes.map((note: Note) => (
        <NoteCard
          key={`note-${note.id}`}
          {...note}
          onClick={() => setSelectedNote(note)}
        />
      ))}
      <NoteDetails
        open={selectedNote !== null}
        onClose={() => setSelectedNote(null)}
        note={selectedNote}
      />
    </div>
  );
};

export {
  NotesGrid
};