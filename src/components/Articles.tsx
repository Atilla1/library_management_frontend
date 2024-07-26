import { useState } from "react";
import _ from "lodash";
import { getArticles } from "../services/fakeArticleService";
import Pagination from "./Pagination";
import ListGroup from "./ListGroup";
import { Category, getCategories } from "../services/fakeCategoryService";
import { getAcronym, paginate } from "../utils";

interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "category.name", order: "asc" };
const PAGE_SIZE = 3;
function Articles() {
  const [articles, setArticles] = useState(getArticles());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  function handleDelete(id: string) {
    const newArticles = articles.filter((article) => article._id !== id);
    setArticles(newArticles);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order = "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    setSortColumn({ ...sortColumn });
  }

  if (articles.length === 0) return <p>Library is emty.</p>;

  const filteredArticles = selectedCategory._id
    ? articles.filter(
        (article) => article.category._id === selectedCategory._id
      )
    : articles;

  const sortedArticles = _.orderBy(
    filteredArticles,
    sortColumn.path,
    sortColumn.order
  );

  const paginatedArticles = paginate(sortedArticles, PAGE_SIZE, selectedPage);

  return (
    <div className="row container pt-3">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col-9">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("category.name")}>Category</th>
              <th>Title</th>
              <th>Author</th>
              <th>Number of pages</th>
              <th onClick={() => handleSort("type")}>Type</th>
              <th>Run time minutes</th>
              <th>Borrowable</th>
              <th>Borrower</th>
              <th>Borrow date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((article) => (
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
          totalCount={filteredArticles.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}

export default Articles;
