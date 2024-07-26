export function range(startNumber: number, endNumber: number): number[] {
  let array: number[] = [];

  for (let count = startNumber; count <= endNumber; count++) {
    array.push(count);
  }

  return array;
}
