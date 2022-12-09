export function halveWord(word: string): Array<string> {
  const middle = Math.ceil(word.length / 2);
  return [word.slice(0, middle), word.slice(middle)];
}