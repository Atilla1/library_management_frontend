import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
import ArticlesPage from "./components/ArticlesPage";
import ArticleFormPage from "./components/ArticleFormPage";
import CategoryFormPage from "./components/CategoryFormPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <ArticlesPage /> },
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:id", element: <ArticleFormPage /> },
      { path: "/categories/", element: <CategoryFormPage /> },
      { path: "/categories/:id", element: <CategoryFormPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
