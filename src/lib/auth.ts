import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin";

export type ServerUser =
  | (import("firebase-admin/auth").DecodedIdToken & { admin?: boolean })
  | null;

export async function getServerUser(): Promise<ServerUser> {
  const cookieStore = await cookies(); // 👈 await
  const cookie = cookieStore.get("session")?.value;
  if (!cookie) return null;
  try {
    const decoded = await getAuth().verifySessionCookie(cookie, true);
    return decoded as ServerUser;
  } catch {
    return null;
  }
}
