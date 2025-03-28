export const averageReadingTime = (content: string): string => {
  if (typeof content !== "string" || content.trim() === "")
    return "0 minute read";
  const wordsPerMinute: number = 200;
  const words: number = content
    .replace(/<[^>]*>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes: number = Math.ceil(words / wordsPerMinute);
  return `${minutes} minute${minutes !== 1 ? "s" : ""} read`;
};
