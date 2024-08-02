import axios from "axios";
import { Category } from "../types";
import { getArticles } from "./fakeArticleService";

export interface CategoryFormData {
  id?: string;
  name: string;
}

export const categories: Category[] = [
  { id: "11_catid", name: "Fiction" },
  { id: "22_catid", name: "Action" },
  { id: "33_catid", name: "Drama" },
  { id: "44_catid", name: "Romance" },
];

export function getCategories() {
  return axios.get<Category[]>("http://localhost:5888/api/categories");
}

export function getCategory(id: string) {
  return axios.get<Category>(`http://localhost:5888/api/categories/${id}`);
}

export function saveCategory(category: CategoryFormData) {
  if (category.id)
    return axios.put<Category>(
      `http://localhost:5888/api/categories/${category.id}`,
      category
    );

  return axios.post<Category>("http://localhost:5888/api/categories", category);
}

export function deleteCategory(id: string) {
  return axios.delete(`http://localhost:5888/api/categories/${id}`);
}
