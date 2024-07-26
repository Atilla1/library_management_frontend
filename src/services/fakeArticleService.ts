// fakeArticleService.ts

import { Category, getCategories } from "./fakeCategoryService";

export interface Article {
  _id: string;
  title: string;
  runTimeMinutes?: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable: boolean;
  category: Category;
  borrower?: string;
  borrowDate?: string;
}

export interface ArticleFormData {
  _id?: string;
  title: string;
  runTimeMinutes?: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable: boolean;
  categoryId: string;
  borrower?: string;
  borrowDate?: string;
}

export const articles: Article[] = [
  {
    _id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    nbrPages: 180,
    type: "Book",
    isBorrowable: true,
    borrower: "John Doe",
    borrowDate: "2024-07-01",
    category: { _id: "111", name: "Ficton" },
  },
  {
    _id: "2",
    title: "I Have No Mouth & I Must Scream",
    author: "Harlan Ellison",
    nbrPages: 280,
    type: "DVD",
    isBorrowable: true,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "222", name: "Action" },
  },
  {
    _id: "3",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    nbrPages: 280,
    type: "DVD",
    isBorrowable: true,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "333", name: "Komedi" },
  },
  {
    _id: "4",
    title: "I Am America",
    author: "Stephen Colbert ",
    runTimeMinutes: 300,
    nbrPages: 280,
    type: "DVD",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "444", name: "Romantik" },
  },
];

export function getArticles() {
  return articles;
}

export function getFood(id: string) {
  return articles.find((article) => article._id === id);
}

export function saveFood(article: ArticleFormData) {
  const categoryInDb = getCategories().find(
    (category) => category._id === article.categoryId
  );

  if (!categoryInDb) throw new Error(`Category was not found`);

  const ArticleInDb =
    articles.find((f) => f._id === article._id) || ({} as Article);

  ArticleInDb.title = article.title;
  ArticleInDb.category = categoryInDb;
  ArticleInDb.runTimeMinutes = article.runTimeMinutes;
  ArticleInDb.author = article.author;
  ArticleInDb.nbrPages = article.nbrPages;
  ArticleInDb.type = article.type;
  ArticleInDb.isBorrowable = article.isBorrowable;
  ArticleInDb.borrowDate = article.borrowDate;

  if (!ArticleInDb._id) {
    ArticleInDb._id = Date.now().toString();
    articles.push(ArticleInDb);
  }

  return ArticleInDb;
}

export function deleteFood(id: string) {
  const foodInDb = articles.find((article) => article._id === id);

  if (foodInDb) articles.splice(articles.indexOf(foodInDb), 1);

  return foodInDb;
}
