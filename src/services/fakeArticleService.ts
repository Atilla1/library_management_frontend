import axios from "axios";
import { Article } from "../types";
import { getCategories } from "./fakeCategoryService";

export interface ArticleFormData {
  id?: string;
  title: string;
  runTimeMinute: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable?: boolean;
  categoryId: string;
  borrower?: string;
  borrowDate?: string;
}

export function getArticles() {
  return axios.get<Article[]>("http://localhost:5888/api/articles");
}

export function getArticle(id: string) {
  return axios.get<Article>(`http://localhost:5888/api/articles/${id}`);
}

export function saveArticle(article: ArticleFormData) {
  const categoryInDb = getCategories().find(
    (category) => category.id === article.categoryId
  );

  if (!categoryInDb) throw new Error(`Category was not found`);

  const ArticleInDb =
    articles.find((f) => f.id === article.id) || ({} as Article);

  ArticleInDb.title = article.title;
  ArticleInDb.category = categoryInDb;
  ArticleInDb.runTimeMinute = article.runTimeMinute;
  ArticleInDb.author = article.author;
  ArticleInDb.nbrPages = article.nbrPages;
  ArticleInDb.type = article.type;
  ArticleInDb.isBorrowable = article.isBorrowable;
  ArticleInDb.borrowDate = article.borrowDate;

  if (!ArticleInDb.id) {
    ArticleInDb.id = Date.now().toString();
    articles.push(ArticleInDb);
  }

  return ArticleInDb;
}

export function deleteArticle(id: string) {
  const articleInDb = articles.find((article) => article.id === id);

  if (articleInDb) articles.splice(articles.indexOf(articleInDb), 1);

  return articleInDb;
}

export function checkOutArticle(id: string, borrower: string) {
  const articleInDb = articles.find((article) => article.id === id);

  if (!articleInDb) {
    throw new Error(`Article with id "${id}" not found.`);
  }

  if (!articleInDb.isBorrowable) {
    throw new Error(`Article with id "${id}" is not available for borrowing.`);
  }

  articleInDb.borrower = borrower;
  articleInDb.borrowDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  articleInDb.isBorrowable = false;

  return articleInDb;
}

// Ny funktion för att checka in en artikel
export function checkInArticle(id: string) {
  const articleInDb = articles.find((article) => article.id === id);

  if (!articleInDb) {
    throw new Error(`Article with id "${id}" not found.`);
  }

  articleInDb.borrower = undefined;
  articleInDb.borrowDate = undefined;
  articleInDb.isBorrowable = true;

  return articleInDb;
}
