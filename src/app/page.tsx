import { CreateNoteButton } from "@/components/CreateNoteButton";
import { NotesGrid } from "@/components/NotesGrid";

export default function HomePage() {
  return (
    <main className="mx-auto w-full min-h-screen flex flex-col-reverse md:flex-col items-center max-w-lg pt-16 gap-2">
      <div className="w-full justify-center md:justify-end py-2 flex">
        <CreateNoteButton />
      </div>
      <NotesGrid />
    </main>
  );
}
