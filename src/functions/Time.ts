export default function (): string {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions | undefined = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString("en-PH", options);
}
