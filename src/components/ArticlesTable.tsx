import { Article } from "../services/fakeArticleService";
import { getAcronym } from "../utils";

interface Props {
  articles: Article[];
  onSort(path: string): void;
  onDelete(id: string): void;
}

function ArticlesTable({ articles, onSort, onDelete }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("category.name")}>Category</th>
          <th>Title</th>
          <th>Author</th>
          <th>Number of pages</th>
          <th onClick={() => onSort("type")}>Type</th>
          <th>Run time minutes</th>
          <th>Borrowable</th>
          <th>Borrower</th>
          <th>Borrow date</th>
          <th />
        </tr>
      </thead>
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
