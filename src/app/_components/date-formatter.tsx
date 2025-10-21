type Props = {
  dateString: string;
  locale?: string;
};

export default function DateFormatter({ dateString, locale = "en" }: Props) {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    // fallback if invalid
    return <time>{dateString}</time>;
  }

  const formatted = new Intl.DateTimeFormat(
    locale === "ja" ? "ja-JP" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  ).format(date);

  return <time dateTime={dateString}>{formatted}</time>;
}