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
  if (article.id)
    return axios.put<Article>(
      `http://localhost:5888/api/articles/${article.id}`,
      article
    );
  return axios.post<Article>("http://localhost:5888/api/articles", article);
}

export function deleteArticle(id: string) {
  return axios.delete(`http://localhost:5888/api/articles/${id}`);
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
