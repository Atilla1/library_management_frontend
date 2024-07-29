import { SortColumn } from "./ArticlesTable";

interface Props {
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function TableHeader({ sortColumn, onSort }: Props) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order = "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  }

  return (
    <thead>
      <tr>
        <th onClick={() => handleSort("category.name")}>Category</th>
        <th>Title</th>
        <th>Author</th>
        <th>Number of pages</th>
        <th onClick={() => handleSort("type")}>Type</th>
        <th>Run time minutes</th>
        <th>Borrowable</th>
        <th>Borrower</th>
        <th>Borrow date</th>
        <th />
      </tr>
    </thead>
  );
}

export default TableHeader;
