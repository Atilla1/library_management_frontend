import { Article } from "../services/fakeArticleService";
import TableBody from "./TableBody";
import TableHeader, { Column } from "./TableHeader";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  articles: Article[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
}

function ArticlesTable({ articles, sortColumn, onSort, onDelete }: Props) {
  const columns: Column[] = [
    { path: "category.name", label: "Category" },
    { path: "title", label: "Title" },
    { path: "author", label: "Author" },
    { path: "nbrPages", label: "Number of pages" },
    { path: "type", label: "Type" },
    { path: "runTimeMinutes", label: "Run Time Minutes" },
    { path: "isBorrowable", label: "Borrowable" },
    { path: "borrower", label: "Borrower" },
    { path: "borrowDate", label: "Borrow date" },
    {
      key: "delete",
      content: (article) => (
        <button
          className="btn btn-danger"
          onClick={() => onDelete(article._id)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody articles={articles} columns={columns} onDelete={onDelete} />
    </table>
  );
}

export default ArticlesTable;
