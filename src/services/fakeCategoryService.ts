import { Category } from "@types";

const categories: Category[] = [
  { _id: "11", name: "Ficton" },
  { _id: "22", name: "Action" },
  { _id: "33", name: "Drama" },
  { _id: "44", name: "Romantik" },
];

export function getCategories() {
  return categories;
}
