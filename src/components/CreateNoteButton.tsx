'use client'
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";

const CreateNoteButton = () => {
  const router = useRouter();

  return (
    <Button
      fullWidth={false}
      onClick={() => router.push("/note/create")}
    >
      <Plus />
      Create new note
    </Button>
  );
};

export {
  CreateNoteButton
};