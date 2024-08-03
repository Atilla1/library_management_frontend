import ArticlesTable from "./ArticlesTable";
import { useEffect, useState } from "react";
import _ from "lodash";

import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import {
  deleteArticle,
  getArticles,
  checkOutArticle,
  checkInArticle,
} from "../services/fakeArticleService";
import { getCategories } from "../services/fakeCategoryService";
import { Article, Category, SortColumn } from "../types";
import { paginate } from "../utils";
import { Await, Link } from "react-router-dom";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "category.name", order: "asc" };
const PAGE_SIZE = 3;
function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      const { data: articles } = await getArticles();
      setArticles(articles);

      console.log("Categories:", categories);
      console.log("Articles:", articles);
    }
    fetch();
  }, []);

  // function handleDelete(id: string) {
  //   const newArticles = articles.filter((article) => article.id !== id);
  //   setArticles(newArticles);
  //   deleteArticle(id);
  // }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  function handleCheckOut(id: string) {
    const name = prompt("Enter your name to check out the article:");
    if (name) {
      try {
        const updatedArticle = checkOutArticle(id, name);
        setArticles(
          articles.map((article) =>
            article.id === id ? updatedArticle : article
          )
        );
      } catch (error) {
        alert("Error meddelande");
      }
    }
  }

  function handleCheckIn(id: string) {
    try {
      const updatedArticle = checkInArticle(id);
      setArticles(
        articles.map((article) =>
          article.id === id ? updatedArticle : article
        )
      );
    } catch (error) {
      alert("Error meddelande");
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
          onCheckOut={handleCheckOut}
          onCheckIn={handleCheckIn}
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
