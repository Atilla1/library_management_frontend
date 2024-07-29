import { Article } from "../services/fakeArticleService";
import { SortColumn } from "./ArticlesTable";

interface Props {
  columns: Column[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

interface TextColumn {
  path: string;
  label: string;
}

interface ContentColumn {
  key: string;
  content(article: Article): JSX.Element;
}

export type Column = TextColumn | ContentColumn;

function TableHeader({ columns, sortColumn, onSort }: Props) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order = "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  }

  function renderSortIcon(column: TextColumn) {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-down" />;

    return <i className="fa-solid fa-sort-up" />;
  }

  return (
    <thead>
      <tr>
        {columns.map((column) =>
          "path" in column ? (
            <th key={column.path} onClick={() => handleSort(column.path)}>
              {column.label} {renderSortIcon(column)}
            </th>
          ) : (
            <th key={column.key} />
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
