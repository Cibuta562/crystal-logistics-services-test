"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type RawItem = {
  id?: unknown;
  landing?: unknown;
  language?: unknown;
  formType?: unknown;
  timestamp?: unknown;
};

type ProcessedItem = {
  id?: string;
  landing: string;
  language: string;
  formType: string;
  timestamp: unknown;
  date: Date | null;
};

type ExportRow = {
  landing: string;
  language: string;
  formType: string;
  timestamp: string;
};

type HourBar = { hour: number; hourLabel: string; count: number };
type DayBar = { day: number; dayLabel: string; count: number };

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asOptionalString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function isSecondsObject(v: unknown): v is { seconds: number } {
  return (
    typeof v === "object" &&
    v !== null &&
    "seconds" in v &&
    typeof (v as { seconds?: unknown }).seconds === "number"
  );
}

function hasToDate(v: unknown): v is { toDate: () => Date } {
  return (
    typeof v === "object" &&
    v !== null &&
    "toDate" in v &&
    typeof (v as { toDate?: unknown }).toDate === "function"
  );
}

function toDate(ts: unknown): Date | null {
  if (!ts) return null;
  if (ts instanceof Date) return ts;
  if (hasToDate(ts)) return ts.toDate();
  if (isSecondsObject(ts)) return new Date(ts.seconds * 1000);

  if (typeof ts === "number") {
    const d = new Date(ts);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  if (typeof ts === "string") {
    const d = new Date(ts);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  return null;
}

function countBy<T>(
  arr: readonly T[],
  getKey: (item: T) => string
): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, item) => {
    const key = getKey(item) || "unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function getHourlyData(arr: readonly ProcessedItem[]): HourBar[] {
  const hours = Array.from({ length: 24 }, () => 0);
  for (const i of arr) {
    const d = i.date;
    if (d) hours[d.getHours()] += 1;
  }
  return hours.map((count, hour) => ({
    hour,
    hourLabel: `${hour}:00`,
    count,
  }));
}

function getWeekdayData(arr: readonly ProcessedItem[]): DayBar[] {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  const days = Array.from({ length: 7 }, () => 0);
  for (const i of arr) {
    const d = i.date;
    if (d) days[d.getDay()] += 1;
  }
  return days.map((count, day) => ({
    day,
    dayLabel: labels[day] ?? String(day),
    count,
  }));
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">{value}</CardContent>
    </Card>
  );
}

export default function Charts({ items }: { items: RawItem[] }) {
  const [selectedLanding, setSelectedLanding] = useState<string>("all");
  const [selectedLang, setSelectedLang] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  const processed = useMemo<ProcessedItem[]>(() => {
    return items.map((i) => {
      const id = asOptionalString(i.id);
      const landing = asString(i.landing, "unknown") || "unknown";
      const language = asString(i.language, "unknown") || "unknown";
      const formType = asString(i.formType, "unknown") || "unknown";
      return {
        id,
        landing,
        language,
        formType,
        timestamp: i.timestamp,
        date: toDate(i.timestamp),
      };
    });
  }, [items]);

  const landingList = useMemo<string[]>(
    () => Array.from(new Set(processed.map((i) => i.landing))).sort(),
    [processed]
  );

  const langList = useMemo<string[]>(
    () => Array.from(new Set(processed.map((i) => i.language))).sort(),
    [processed]
  );

  const typeList = useMemo<string[]>(
    () => Array.from(new Set(processed.map((i) => i.formType))).sort(),
    [processed]
  );

  const baseFiltered = useMemo<ProcessedItem[]>(() => {
    return processed.filter((i) => {
      if (selectedLanding !== "all" && i.landing !== selectedLanding)
        return false;
      if (selectedLang !== "all" && i.language !== selectedLang) return false;
      if (selectedType !== "all" && i.formType !== selectedType) return false;

      if (i.date) {
        if (startDate) {
          const start = new Date(startDate);
          if (!Number.isNaN(start.getTime()) && i.date < start) return false;
        }

        if (endDate) {
          const end = new Date(endDate);
          if (!Number.isNaN(end.getTime())) {
            end.setHours(23, 59, 59, 999);
            if (i.date > end) return false;
          }
        }
      }

      return true;
    });
  }, [
    processed,
    selectedLanding,
    selectedLang,
    selectedType,
    startDate,
    endDate,
  ]);

  const searched = useMemo<ProcessedItem[]>(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return baseFiltered;
    return baseFiltered.filter((i) => {
      return (
        i.landing.toLowerCase().includes(term) ||
        i.formType.toLowerCase().includes(term) ||
        i.language.toLowerCase().includes(term)
      );
    });
  }, [baseFiltered, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(searched.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginated = searched.slice(startIndex, startIndex + PAGE_SIZE);

  function resetPage() {
    setCurrentPage(1);
  }

  const total = baseFiltered.length;
  const byLanguage = useMemo(
    () => countBy(baseFiltered, (i) => i.language),
    [baseFiltered]
  );
  const byFormType = useMemo(
    () => countBy(baseFiltered, (i) => i.formType),
    [baseFiltered]
  );
  const byLanding = useMemo(
    () => countBy(baseFiltered, (i) => i.landing),
    [baseFiltered]
  );

  const byFormTypeEntries = useMemo(
    () => Object.entries(byFormType).sort((a, b) => b[1] - a[1]),
    [byFormType]
  );

  const chartData = useMemo(
    () =>
      Object.entries(byLanding)
        .sort((a, b) => b[1] - a[1])
        .map(([page, count]) => ({ page, count })),
    [byLanding]
  );

  const hourlyData = useMemo(() => getHourlyData(baseFiltered), [baseFiltered]);
  const weekdayData = useMemo(
    () => getWeekdayData(baseFiltered),
    [baseFiltered]
  );

  function handleExportCSV() {
    const rows: ExportRow[] = baseFiltered.map((i) => ({
      landing: String(i.landing ?? ""),
      language: String(i.language ?? ""),
      formType: String(i.formType ?? ""),
      timestamp: i.date?.toISOString() ?? "",
    }));

    const header: (keyof ExportRow)[] = [
      "landing",
      "language",
      "formType",
      "timestamp",
    ];

    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header
          .map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `submissions-${dateStr}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleExportPDF() {
    const win = window.open("", "_blank");
    if (!win) return;

    const rowsHtml = baseFiltered
      .map((i) => {
        const landing = String(i.landing ?? "");
        const language = String(i.language ?? "");
        const formType = String(i.formType ?? "");
        const timestamp = i.date ? i.date.toISOString() : "";
        return `<tr><td>${landing}</td><td>${language}</td><td>${formType}</td><td>${timestamp}</td></tr>`;
      })
      .join("");

    win.document.write(`
      <html>
        <head>
          <title>Form Submissions</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 6px; font-size: 12px; }
            th { background: #f3f3f3; }
          </style>
        </head>
        <body>
          <h1>Form Submissions (${baseFiltered.length})</h1>
          <table>
            <thead>
              <tr>
                <th>Landing</th>
                <th>Language</th>
                <th>Form Type</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-8">
      <h1 className="flex items-center gap-3 text-3xl font-bold">
        Form Analytics Dashboard
      </h1>

      <div className="flex gap-3">
        <button onClick={handleExportCSV} className="rounded border px-4 py-2">
          Export CSV
        </button>
        <button onClick={handleExportPDF} className="rounded border px-4 py-2">
          Export PDF
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <div>
            <p className="mb-1 text-sm font-semibold">Landing</p>
            <Select
              value={selectedLanding}
              onValueChange={(v) => {
                setSelectedLanding(v);
                resetPage();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All pages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {landingList.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">Language</p>
            <Select
              value={selectedLang}
              onValueChange={(v) => {
                setSelectedLang(v);
                resetPage();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {langList.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">Form Type</p>
            <Select
              value={selectedType}
              onValueChange={(v) => {
                setSelectedType(v);
                resetPage();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {typeList.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">Start Date</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                resetPage();
              }}
              className="w-full rounded border px-2 py-2"
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-semibold">End Date</p>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                resetPage();
              }}
              className="w-full rounded border px-2 py-2"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Total Submissions" value={total} />
        <StatCard title="RO Submissions" value={byLanguage.ro ?? 0} />
        <StatCard title="EN Submissions" value={byLanguage.en ?? 0} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions per Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="page" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activity by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis dataKey="hourLabel" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity by Weekday</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weekdayData}>
                  <XAxis dataKey="dayLabel" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions by Form Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {byFormTypeEntries.map(([type, count]) => (
              <li key={type} className="flex justify-between border-b pb-1">
                <span>{type}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest Submissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                resetPage();
              }}
              className="w-full rounded border px-3 py-2 md:w-80"
            />
            <p className="text-xs text-muted-foreground">
              Showing {paginated.length} of {searched.length} (filtered) /{" "}
              {baseFiltered.length} total
            </p>
          </div>

          {paginated.map((entry, idx) => {
            const key =
              entry.id ??
              `${entry.landing}-${entry.formType}-${entry.language}-${
                entry.date?.toISOString() ?? "na"
              }-${idx}`;

            return (
              <div
                key={key}
                className="space-y-1 rounded-md border p-3 text-sm"
              >
                <p>
                  <strong>Landing:</strong> {entry.landing}
                </p>
                <p>
                  <strong>Lang:</strong> {entry.language}
                </p>
                <p>
                  <strong>Form:</strong> {entry.formType}
                </p>
                <p>
                  <strong>At:</strong> {entry.date?.toISOString() ?? ""}
                </p>
              </div>
            );
          })}

          <div className="flex justify-between pt-2 text-sm">
            <span>
              Page {safePage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="rounded border px-3 py-1 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={safePage >= totalPages}
                className="rounded border px-3 py-1 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
