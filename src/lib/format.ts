export function formatDate(
  value: string | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  const date = typeof value === "string" ? new Date(value) : value;
  const intlLocale = locale === "ro" ? "ro-RO" : "en-GB";
  return new Intl.DateTimeFormat(intlLocale, options).format(date);
}
