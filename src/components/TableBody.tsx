import { Article } from "../services/fakeArticleService";
import { getAcronym } from "../utils";

interface Props {
  articles: Article[];
  onDelete(id: string): void;
}

function TableBody({ articles, onDelete }: Props) {
  return (
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
  );
}

export default TableBody;
