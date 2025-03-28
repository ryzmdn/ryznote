export function clss(...classes: (string | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}