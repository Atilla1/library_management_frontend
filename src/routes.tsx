import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
import ArticlesPage from "./components/pages/ArticlesPage";
import ArticleFormPage from "./components/pages/ArticleFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/articles", element: <ArticlesPage /> },
      { path: "/articles/:id", element: <ArticleFormPage /> },
    ],
  },
]);

export default router;
