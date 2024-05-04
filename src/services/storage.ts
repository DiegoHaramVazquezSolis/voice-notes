import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "@/services/firebase";

export async function uploadChunk(chunk: Blob[], streamId: string) {
  const storageRef = ref(storage, `${streamId}.webm`);
  const blob = new Blob(chunk, { type: "audio/webm" });

  const { ref: chunkRef, metadata } = await uploadBytes(storageRef, blob);

  if (Array.isArray(metadata.downloadTokens) && metadata.downloadTokens.length > 0) {

    return `https://firebasestorage.googleapis.com/v0/b/${chunkRef.bucket}/o/${chunkRef.fullPath}?alt=media&token=${metadata.downloadTokens[0]}`;
  }

  if (typeof metadata.downloadTokens === "string") {

    return `https://firebasestorage.googleapis.com/v0/b/${chunkRef.bucket}/o/${chunkRef.fullPath}?alt=media&token=${metadata.downloadTokens}`;
  }

  return await getDownloadURL(chunkRef);
}
