import ArticlesTable from "../ArticlesTable";
import { useState } from "react";
import _ from "lodash";

import ListGroup from "../common/ListGroup";
import Pagination from "../common/Pagination";
import { getArticles } from "../../services/fakeArticleService";
import { getCategories } from "../../services/fakeCategoryService";
import { Category, SortColumn } from "../../types";
import { paginate } from "../../utils";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "category.name", order: "asc" };
const PAGE_SIZE = 3;
function ArticlesPage() {
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
      <div className="col-2">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...getCategories()]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        <ArticlesTable
          articles={paginatedArticles}
          sortColumn={sortColumn}
          onSort={setSortColumn}
          onDelete={handleDelete}
        />
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

export default ArticlesPage;
