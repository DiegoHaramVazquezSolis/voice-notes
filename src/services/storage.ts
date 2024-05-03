import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "@/services/firebase";

export async function uploadChunk(chunk: Blob[], streamId: string) {
  const storageRef = ref(storage, `${streamId}.webm`);
  const blob = new Blob(chunk, { type: "audio/webm" });

  const { ref: chunkRef } = await uploadBytes(storageRef, blob);

  return await getDownloadURL(chunkRef);
}
