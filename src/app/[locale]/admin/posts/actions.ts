"use server";

import "@/lib/firebase-admin";
import { getServerUser } from "@/lib/auth";
import { PostInput } from "@/lib/postSchema";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

const db = getFirestore();
const IS_DEV = process.env.NODE_ENV !== "production";

type ServerUser = {
  uid: string;
  email?: string | null;
  admin?: boolean;
} | null;

function assertAdmin(user: ServerUser) {
  if (IS_DEV) {
    if (!user) {
      console.warn(
        "[assertAdmin] dev mode: user null/unauthenticated, dar lăsăm să treacă"
      );
    } else if (!user.admin) {
      console.warn(
        "[assertAdmin] dev mode: user fără admin:true, dar lăsăm să treacă",
        user.email || user.uid
      );
    }
    return;
  }

  if (!user) throw new Error("Unauthenticated");
  if (user.admin !== true) throw new Error("Forbidden");
}

type FirestorePostDoc = Record<string, unknown> & { publishedAt?: unknown };

type DraftPayload = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  articleDate?: string;
  coverUrl?: string;
  tags: string[];
  sections: unknown[];
  published?: boolean;
  createdAt?: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export async function listPosts() {
  const user = (await getServerUser()) as ServerUser;
  assertAdmin(user);

  const snap = await db
    .collection("posts")
    .orderBy("publishedAt", "desc")
    .get();

  return snap.docs.map((d) => {
    const data = d.data() as FirestorePostDoc;
    return { id: d.id, ...data };
  });
}

export async function saveDraft(input: unknown) {
  const user = (await getServerUser()) as ServerUser;
  assertAdmin(user);

  const data = PostInput.parse(input) as DraftPayload;

  const ref = data.id
    ? db.collection("drafts").doc(data.id)
    : db.collection("drafts").doc();

  const now = Timestamp.now();

  await ref.set(
    {
      ...data,
      createdAt: data.createdAt ?? now,
      updatedAt: now,
    },
    { merge: true }
  );

  return { id: ref.id };
}

export async function publishDraft(id: string) {
  const user = (await getServerUser()) as ServerUser;
  assertAdmin(user);

  const draftRef = db.collection("drafts").doc(id);
  const draft = await draftRef.get();
  if (!draft.exists) throw new Error("Draft not found");

  const raw = draft.data();
  if (!isRecord(raw)) throw new Error("Invalid draft");

  const slug = typeof raw.slug === "string" ? raw.slug : "";
  if (!slug) throw new Error("Draft slug missing");

  const now = Timestamp.now();
  const publishedAt =
    raw.publishedAt instanceof Timestamp ? raw.publishedAt : now;

  const postRef = db.collection("posts").doc(slug);

  await postRef.set(
    {
      ...raw,
      published: true,
      publishedAt,
      updatedAt: now,
    },
    { merge: true }
  );

  await draftRef.delete();

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { id: postRef.id };
}
