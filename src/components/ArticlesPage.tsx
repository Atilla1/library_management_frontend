import ArticlesTable from "./ArticlesTable";
import { useEffect, useState } from "react";
import _ from "lodash";

import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import { getArticles, borrowArticle } from "../services/fakeArticleService";
import { getCategories } from "../services/fakeCategoryService";
import { Article, Category, SortColumn, User } from "../types";
import { paginate } from "../utils";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "category.name", order: "asc" };
const PAGE_SIZE = 3;
function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      const { data: articles } = await getArticles();
      setArticles(articles);

      const token = localStorage.getItem("token");
      if (!token) return;

      const user = jwtDecode<User>(token);
      setUser(user);
    }
    fetch();
  }, []);

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  async function checkOutArticle(id: string) {
    if (!user) {
      return;
    }

    try {
      const { data: updatedArticle } = await borrowArticle(id, user.name);
      setArticles(
        articles.map((article) =>
          article.id === id ? updatedArticle : article
        )
      );
    } catch (error) {
      alert("Error checking out the article.");
    }
  }

  async function checkInArticle(id: string) {
    try {
      const { data: updatedArticle } = await borrowArticle(id, null);
      setArticles(
        articles.map((article) =>
          article.id === id ? updatedArticle : article
        )
      );
    } catch (error) {
      alert("Error checking in the article.");
    }
  }

  const filteredArticles = selectedCategory.id
    ? articles.filter((article) => article.categoryId === selectedCategory.id)
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
          items={[DEFAULT_CATEGORY, ...categories]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        <Link to="/articles/new" className="btn btn-primary mb-2 m-1">
          New Article
        </Link>
        <Link to="/categories/new" className="btn btn-primary mb-2 m-1 ">
          New Category
        </Link>
        <ArticlesTable
          articles={paginatedArticles}
          sortColumn={sortColumn}
          onSort={setSortColumn}
          onCheckOut={checkOutArticle}
          onCheckIn={checkInArticle}
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
