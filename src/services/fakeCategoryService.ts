// fakeCategoryService.js

export interface Category {
  _id: string;
  name: string;
}

const categories: Category[] = [
  { _id: "111", name: "Ficton" },
  { _id: "222", name: "Action" },
  { _id: "333", name: "Drama" },
  { _id: "444", name: "Romantik" },
];

export function getCategories() {
  return categories;
}
