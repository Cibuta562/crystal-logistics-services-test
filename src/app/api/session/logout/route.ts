import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies(); // 👈 await
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return new Response("ok");
}
