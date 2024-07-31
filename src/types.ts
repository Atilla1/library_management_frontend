export interface TextColumn {
  path: string;
  label: string;
}

export interface ContentColumn {
  key: string;
  content(article: Article): JSX.Element;
}

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

export interface Category {
  _id: string;
  name: string;
}

export interface Article {
  _id: string;
  title: string;
  runTimeMinutes: number;
  author: string;
  nbrPages: number;
  type: string;
  isBorrowable?: boolean;
  category: Category;
  borrower?: string;
  borrowDate?: string;
}

export type Column = TextColumn | ContentColumn;
