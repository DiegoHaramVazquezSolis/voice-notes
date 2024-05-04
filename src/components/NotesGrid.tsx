'use client'
import React from 'react';

import { useNotes } from '@/context/NotesContext';

const NotesGrid = () => {
  const { notes } = useNotes();

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="break-inside-avoid mb-4 rounded-lg shadow-lg p-4 border-2 border-slate-800">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-xl font-bold">
              {note.title}
            </h2>
            <p className="text-sm line-clamp-3">
              {note.content}
            </p>
          </div>
          <div className="flex justify-end">
            <small className="text-xs">
              {new Date(note.timestamp).toLocaleDateString(undefined, {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
              })}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export {
  NotesGrid
};