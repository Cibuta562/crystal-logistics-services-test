"use client";

import dynamic from "next/dynamic";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type SubmissionItem = {
  id: string;
  event?: string;
  [key: string]: JsonValue | undefined;
};

const Charts = dynamic(() => import("./charts"), { ssr: false });

export default function DashboardWrapper({
  items,
}: {
  items: SubmissionItem[];
}) {
  return <Charts items={items} />;
}
