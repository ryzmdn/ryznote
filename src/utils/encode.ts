export function convertEncode(text: string): string {
  if (typeof text !== "string") {
    return text;
  }

  let convertedText = text;

  convertedText = convertedText.replace(/&nbsp;|\u00A0/g, " ");
  convertedText = convertedText.replace(/&#8217;/g, "'");

  return convertedText;
}
