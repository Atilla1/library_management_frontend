import { useState } from "react";
import { getArticles } from "../services/fakeArticleService";
import Pagination from "./Pagination";
import ListGroup from "./ListGroup";
import { Category, getCategories } from "../services/fakeCategoryService";
import { paginate } from "../utils";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const PAGE_SIZE = 3;
function Articles() {
  const [articles, setArticles] = useState(getArticles());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  function handleDelete(id: string) {
    const newArticles = articles.filter((article) => article._id !== id);
    setArticles(newArticles);
  }
  if (articles.length === 0) return <p>Library is emty.</p>;

  const paginatedArticles = paginate(articles, PAGE_SIZE, selectedPage);

  return (
    <div className="row container pt-3">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={selectedCategory}
          onItemSelect={setSelectedCategory}
        />
      </div>
      <div className="col-9">
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
            {paginatedArticles.map((article) => (
              <tr>
                <td>{article.title}</td>
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
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalCount={articles.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}

export default Articles;
