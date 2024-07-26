export function range(startNumber: number, endNumber: number): number[] {
  let array: number[] = [];

  for (let count = startNumber; count <= endNumber; count++) {
    array.push(count);
  }

  return array;
}

export function paginate<T>(
  items: T[],
  pageSize: number,
  selectedPage: number
) {
  const startIndex = pageSize * (selectedPage - 1);
  const endIndex = pageSize * selectedPage;

  return items.slice(startIndex, endIndex);
}
