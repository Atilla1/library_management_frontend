import { Article } from "../services/fakeArticleService";
import { getAcronym } from "../utils";
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
    { path: "name", label: "Name" },
    { path: "author", label: "Author" },
    { path: "nbrPages", label: "Number of pages" },
    { path: "type", label: "Type" },
    { path: "runTimeMinutes", label: "Run Time Minutes" },
    { path: "isBorrowable", label: "Borrowable" },
    { path: "borrower", label: "Borrower" },
    { path: "borrowDate", label: "Borrow date" },
    { key: "delete" },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <tbody>
        {articles.map((article) => (
          <tr>
            <td>{article.category.name}</td>
            <td>
              {article.title} ({getAcronym(article.title)})
            </td>
            <td>{article.author}</td>
            <td>{article.nbrPages}</td>
            <td>{article.type}</td>
            <td>{article.runTimeMinutes}</td>
            <td>{article.isBorrowable ? "Available" : "N/A"}</td>
            <td>{article.borrower}</td>
            <td>{article.borrowDate}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(article._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ArticlesTable;
