import { signInAnonymously } from "firebase/auth";

import { auth } from "@/services/firebase";

export async function signIn() {
  return await signInAnonymously(auth);
}

