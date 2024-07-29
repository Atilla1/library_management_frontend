import { Article } from "../services/fakeArticleService";
import { SortColumn } from "./ArticlesTable";
import TableBody from "./TableBody";
import TableHeader, { Column } from "./TableHeader";

interface Props {
  articles: Article[];
  columns: Column[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function Table({ articles, columns, sortColumn, onSort }: Props) {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody articles={articles} columns={columns} />
    </table>
  );
}

export default Table;
