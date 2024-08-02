import { Article } from "../types";
import { getCategories } from "./fakeCategoryService";

export interface ArticleFormData {
  id?: string;
  title: string;
  runTimeMinutes: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable?: boolean;
  categoryId: string;
  borrower?: string;
  borrowDate?: string;
}

export const articles: Article[] = [
  {
    id: "1-abcdid",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    nbrPages: 180,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { id: "11_catid", name: "Ficton" },
  },
  {
    id: "2-abcdid",
    title: "I Have No Mouth & I Must Scream",
    author: "Harlan Ellison",
    nbrPages: 0,
    runTimeMinutes: 125,
    type: "DVD",
    isBorrowable: true,
    category: { id: "22_catid", name: "Action" },
  },
  {
    id: "3-abcdid",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    nbrPages: 0,
    runTimeMinutes: 120,
    type: "Audiobook",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { id: "33_catid", name: "Drama" },
  },
  {
    id: "4-abcdid",
    title: "I Am America",
    author: "Stephen Colbert ",
    nbrPages: 0,
    runTimeMinutes: 300,
    type: "DVD",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { id: "44_catid", name: "Romantik" },
  },
  {
    id: "5-abcdid",
    title: "Blue Sisters",
    author: "Coco Mellors ",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { id: "44_catid", name: "Romantik" },
  },
  {
    id: "6-abcdid",
    title: "Intermezzo",
    author: "Sally Rooney",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Reference book",
    isBorrowable: false,
    category: { id: "44_catid", name: "Romantik" },
  },
];

export function getArticles() {
  return articles;
}

export function getArticle(id: string) {
  return articles.find((article) => article.id === id);
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
  ArticleInDb.runTimeMinutes = article.runTimeMinutes;
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
