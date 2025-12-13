import { adminDb } from "@/lib/firebase-admin";
import DashboardWrapper from "./wrapper";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type TimestampToDate = { toDate: () => Date };
type TimestampSeconds = { seconds: number; nanoseconds: number };
type Timestamp_Underscore = { _seconds: number; _nanoseconds: number };

function isTimestampToDate(v: unknown): v is TimestampToDate {
  return (
    typeof v === "object" &&
    v !== null &&
    "toDate" in v &&
    typeof (v as { toDate?: unknown }).toDate === "function"
  );
}

function isTimestampSeconds(v: unknown): v is TimestampSeconds {
  return (
    typeof v === "object" &&
    v !== null &&
    "seconds" in v &&
    "nanoseconds" in v &&
    typeof (v as { seconds?: unknown }).seconds === "number" &&
    typeof (v as { nanoseconds?: unknown }).nanoseconds === "number"
  );
}

function isTimestampUnderscore(v: unknown): v is Timestamp_Underscore {
  return (
    typeof v === "object" &&
    v !== null &&
    "_seconds" in v &&
    "_nanoseconds" in v &&
    typeof (v as { _seconds?: unknown })._seconds === "number" &&
    typeof (v as { _nanoseconds?: unknown })._nanoseconds === "number"
  );
}

function timestampToIso(v: unknown): string | null {
  if (isTimestampToDate(v)) return v.toDate().toISOString();
  if (isTimestampUnderscore(v))
    return new Date(v._seconds * 1000).toISOString();
  if (isTimestampSeconds(v)) return new Date(v.seconds * 1000).toISOString();
  return null;
}

function convertDocData(data: unknown): JsonValue {
  if (data === null) return null;

  const iso = timestampToIso(data);
  if (iso) return iso;

  if (Array.isArray(data)) {
    return data.map((v) => convertDocData(v));
  }

  if (typeof data === "object") {
    const out: Record<string, JsonValue> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      out[k] = convertDocData(v);
    }
    return out;
  }

  if (typeof data === "string") return data;
  if (typeof data === "number") return data;
  if (typeof data === "boolean") return data;

  return String(data);
}

type SubmissionItem = {
  id: string;
  event?: string;
  [key: string]: JsonValue | undefined;
};

export default async function FormsDashboardPage() {
  const snap = await adminDb.collection("form_submissions").get();

  const allItems: SubmissionItem[] = snap.docs.map((d) => {
    const converted = convertDocData(d.data());
    const obj =
      converted && typeof converted === "object" && !Array.isArray(converted)
        ? (converted as Record<string, JsonValue>)
        : {};
    return { id: d.id, ...obj };
  });

  const items = allItems.filter(
    (item) => !item.event || item.event === "form_submission"
  );

  return <DashboardWrapper items={items} />;
}
