'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ref, onValue, push, set, serverTimestamp } from "firebase/database";

import { Note } from '@/types';
import { database } from "@/services/firebase";

interface NotesContextType {
  notes: Note[] | undefined;
  addNote: (content: string, title?: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[] | undefined>(undefined);

  useEffect(() => {
    const notesRef = ref(database, "notes/");
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedNotes = [];
      for (const key in data) {
        loadedNotes.push({
          id: key,
          content: data[key].content,
          title: data[key].title,
          timestamp: data[key].timestamp,
        });
      }

      setNotes(loadedNotes);
    });

    return () => unsubscribe();
  }, []);

  const addNote = (content: string, title: string = "New note") => {
    const notesRef = ref(database, "notes/");
    const newNoteRef = push(notesRef);
    set(newNoteRef, {
      content,
      title,
      timestamp: serverTimestamp()
    });
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
