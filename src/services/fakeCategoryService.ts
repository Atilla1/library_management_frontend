import { Category } from "../types";
import { getArticles } from "./fakeArticleService";

const categories: Category[] = [
  { _id: "11_catid", name: "Ficton" },
  { _id: "22_catid", name: "Action" },
  { _id: "33_catid", name: "Drama" },
  { _id: "44_catid", name: "Romantik" },
];

export function getCategories() {
  return categories;
}

export function getCategory(id: string) {
  return categories.find((category) => category._id === id);
}

export function saveCategory(category: Category) {
  const categoryInDb =
    categories.find((f) => f._id === category._id) || ({} as Category);

  categoryInDb.name = category.name;

  if (!categoryInDb._id) {
    categoryInDb._id = Date.now().toString();
    categories.push(categoryInDb);
  }

  return categoryInDb;
}

export function deleteCategory(id: string) {
  // Kontrollera om kategorin är bunden till någon artikel
  const articles = getArticles();
  const isCategoryInUse = articles.some(
    (article) => article.category._id === id
  );

  if (isCategoryInUse) {
    throw new Error(
      `Category with id ${id} is in use by an article and cannot be deleted.`
    );
  }

  const categoryInDb = categories.find((category) => category._id === id);

  if (categoryInDb) {
    categories.splice(categories.indexOf(categoryInDb), 1);
  }

  return categoryInDb;
}
