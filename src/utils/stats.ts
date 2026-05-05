export function countCharacters(content: string): number {
  return content.length;
}

export function countWords(content: string): number {
  if (!content.trim()) return 0;
  // For CJK + Latin mixed content, count each CJK char as a word
  const cjk = content.match(/[一-鿿぀-ゟ゠-ヿ]/g);
  const latin = content.match(/[a-zA-Z0-9]+(?:['-][a-zA-Z0-9]+)*/g);
  return (cjk?.length ?? 0) + (latin?.length ?? 0);
}
