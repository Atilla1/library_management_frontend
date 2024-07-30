import { Article, Column, SortColumn } from "../../types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

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
