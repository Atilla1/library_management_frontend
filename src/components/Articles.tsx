import { useState } from "react";
import { getArticles } from "../services/fakeArticleService";
import Pagination from "./Pagination";

export default function Articles() {
  const [articles, setArticles] = useState(getArticles());

  function handleDelete(id: string) {
    const newArticles = articles.filter((article) => article._id !== id);
    setArticles(newArticles);
  }
  if (articles.length === 0) return <p>Library is emty.</p>;
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Number of pages</th>
            <th scope="col">Type</th>
            <th scope="col">Run time minutes</th>
            <th scope="col">Borrowable</th>
            <th scope="col">Borrower</th>
            <th scope="col">Borrow date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.nbrPages}</td>
              <td>{article.type}</td>
              <td>{article.runTimeMinutes}</td>
              <td>{article.isBorrowable}</td>
              <td>{article.borrower}</td>
              <td>{article.borrowDate}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination totalCount={articles.length} pageSize={2} />
    </div>
  );
}
