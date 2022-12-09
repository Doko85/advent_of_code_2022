export function numbersInRange(start: number, end: number): Array<number> {
  return Array.from({ length: end - start + 1 }, (el, i) => i + start);
}