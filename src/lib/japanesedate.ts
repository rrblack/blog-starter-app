export function formatDate(dateString: string, locale: string) {
  const date = new Date(dateString);

  if (locale === "ja") {
    // Japanese style: 2025年10月20日
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  // Default English style: October 20, 2025
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}