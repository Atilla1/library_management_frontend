import { Article } from "../types";
import { getCategories } from "./fakeCategoryService";

export interface ArticleFormData {
  _id?: string;
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
    _id: "1-abcd_id",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    nbrPages: 180,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { _id: "11_catid", name: "Ficton" },
  },
  {
    _id: "2-abcd_id",
    title: "I Have No Mouth & I Must Scream",
    author: "Harlan Ellison",
    nbrPages: 0,
    runTimeMinutes: 125,
    type: "DVD",
    isBorrowable: true,
    category: { _id: "22_catid", name: "Action" },
  },
  {
    _id: "3-abcd_id",
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    nbrPages: 0,
    runTimeMinutes: 120,
    type: "Audiobook",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "33_catid", name: "Drama" },
  },
  {
    _id: "4-abcd_id",
    title: "I Am America",
    author: "Stephen Colbert ",
    nbrPages: 0,
    runTimeMinutes: 300,
    type: "DVD",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "44_catid", name: "Romantik" },
  },
  {
    _id: "5-abcd_id",
    title: "Blue Sisters",
    author: "Coco Mellors ",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Book",
    isBorrowable: true,
    category: { _id: "44_catid", name: "Romantik" },
  },
  {
    _id: "6-abcd_id",
    title: "Intermezzo",
    author: "Sally Rooney",
    nbrPages: 280,
    runTimeMinutes: 0,
    type: "Reference book",
    isBorrowable: false,
    borrower: "Kalle Anka",
    borrowDate: "2024-07-01",
    category: { _id: "44_catid", name: "Romantik" },
  },
];

export function getArticles() {
  return articles;
}

export function getArticle(id: string) {
  return articles.find((article) => article._id === id);
}

export function saveArticle(article: ArticleFormData) {
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

export function deleteArticle(id: string) {
  const articleInDb = articles.find((article) => article._id === id);

  if (articleInDb) articles.splice(articles.indexOf(articleInDb), 1);

  return articleInDb;
}
