import axios from "axios";
import { Article } from "../types";

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

export function borrowArticle(id: string, borrower: string | null) {
  return axios.put<Article>(`http://localhost:5888/api/articles/${id}/borrow`, {
    borrower: borrower,
    borrowDate: borrower ? new Date().toISOString().split("T")[0] : null, // YYYY-MM-DD format
    isBorrowable: !borrower,
  });
}
