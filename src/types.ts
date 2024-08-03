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
  id: string;
  name: string;
}

export interface Article {
  id: string;
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

export interface User {
  id: string;
  name: string;
  userName: string;
  isAdmin: boolean;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export type Column = TextColumn | ContentColumn;
