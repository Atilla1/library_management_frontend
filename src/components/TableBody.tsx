import { Article, Column } from "../types";
import { getAcronym } from "../utils";
import _ from "lodash";

interface Props {
  articles: Article[];
  columns: Column[];
}

function TableBody({ articles, columns }: Props) {
  return (
    <tbody>
      {articles.map((article) => (
        <tr key={article.id}>
          {columns.map((column) =>
            "content" in column ? (
              <td key={`${article.id}-${column.key}`}>
                {column.content(article)}
              </td>
            ) : (
              <td key={`${article.id}-${column.path}`}>
                {column.path === "title" ? (
                  <>
                    {_.get(article, column.path)} (
                    {getAcronym(_.get(article, column.path))})
                  </>
                ) : column.path === "isBorrowable" ? (
                  article.isBorrowable ? (
                    "Available"
                  ) : (
                    "Not Available"
                  )
                ) : (
                  _.get(article, column.path)
                )}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
