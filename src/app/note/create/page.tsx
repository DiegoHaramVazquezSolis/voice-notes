import { NoteAccessControl } from '@/components/NoteAccessControl';

export default function CreateNotePage() {
  return (
    <main className="mx-auto w-full h-screen flex flex-col items-center justify-center max-w-lg pt-16 gap-2">
      <NoteAccessControl />
    </main>
  );
}
