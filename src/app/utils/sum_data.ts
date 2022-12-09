export function sumData(_arr: Array<number>): number {
  return _arr.reduce((sum, num) => (sum += num), 0);
}