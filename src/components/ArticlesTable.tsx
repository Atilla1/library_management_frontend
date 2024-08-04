import { Link } from "react-router-dom";
import { Article, SortColumn, Column } from "../types";
import Table from "./Table";

interface Props {
  articles: Article[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onCheckOut(id: string): void;
  onCheckIn(id: string): void;
}

function ArticlesTable({
  articles,
  sortColumn,
  onSort,
  onCheckOut,
  onCheckIn,
}: Props) {
  const columns: Column[] = [
    { path: "category.name", label: "Category" },
    {
      path: "title",
      label: "Title",
      content: (article) => (
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      ),
    },
    { path: "author", label: "Author" },
    { path: "nbrPages", label: "Number of pages" },
    { path: "type", label: "Type" },
    { path: "runTimeMinute", label: "Run Time Minutes" },
    { path: "isBorrowable", label: "Borrowable" },
    { path: "borrower", label: "Borrower" },
    {
      path: "borrowDate",
      label: "Borrow date",
      content: (article) => {
        const date = new Date(article.borrowDate || "");
        if (!article.borrowDate) {
          return <span></span>;
        }

        return <span>{date.toLocaleDateString()}</span>;
      },
    },

    {
      key: "actions",
      content: (article) => (
        <>
          {article.type !== "Reference book" && (
            <>
              {article.isBorrowable ? (
                <button
                  className="btn btn-success m-1 "
                  onClick={() => onCheckOut(article.id)}
                >
                  Check Out
                </button>
              ) : (
                <button
                  className="btn btn-warning m-1 "
                  onClick={() => onCheckIn(article.id)}
                >
                  Check In
                </button>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      articles={articles}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}

export default ArticlesTable;
