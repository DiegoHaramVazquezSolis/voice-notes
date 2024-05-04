'use client'
import React from 'react';

import { useNotes } from '@/context/NotesContext';

const NotesGrid = () => {
  const { notes } = useNotes();

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="flex flex-col gap-6 rounded-lg shadow-lg p-4 border-2 border-slate-800">
          <div className="flex flex-col gap-2 h-full">
            <h2 className="text-xl font-bold">
              {note.title}
            </h2>
            <p className="text-sm max-h-24 line-clamp-3">
              {note.content}
            </p>
          </div>
          <div className="flex flex-row justify-between self-end">
            <small className="text-xs">
              {new Date(note.timestamp).toLocaleDateString()}
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