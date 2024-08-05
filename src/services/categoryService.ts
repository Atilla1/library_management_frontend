import axios from "axios";
import { Category } from "../types";
import { BASE_URL } from "../constants";

export interface CategoryFormData {
  id?: string;
  name: string;
}

export function getCategories() {
  return axios.get<Category[]>(`${BASE_URL}/api/categories`);
}

export function getCategory(id: string) {
  return axios.get<Category>(`${BASE_URL}/api/categories/${id}`);
}

export function saveCategory(category: CategoryFormData) {
  if (category.id)
    return axios.put<Category>(
      `${BASE_URL}/api/categories/${category.id}`,
      category
    );

  return axios.post<Category>(`${BASE_URL}/api/categories`, category);
}

export function deleteCategory(id: string) {
  return axios.delete(`${BASE_URL}/api/categories/${id}`);
}
