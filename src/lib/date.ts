export function formatRoDate(d?: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
