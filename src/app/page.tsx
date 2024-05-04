import { CreateNoteButton } from "@/components/CreateNoteButton";
import { NotesGrid } from "@/components/NotesGrid";

export default function HomePage() {

  return (
    <main className="mx-auto w-full h-screen flex flex-col items-center max-w-lg pt-16 gap-2">
      <div className="flex w-full justify-end py-2">
        <CreateNoteButton />
      </div>
      <NotesGrid />
    </main>
  );
}
