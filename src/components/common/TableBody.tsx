import _ from "lodash";
import { Article } from "../../services/fakeArticleService";
import { getAcronym } from "../../utils";
import { Column } from "../../types";

interface Props {
  articles: Article[];
  columns: Column[];
}

function TableBody({ articles, columns }: Props) {
  return (
    <tbody>
      {articles.map((article) => (
        <tr key={article._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>
                {column.path === "title"
                  ? `${_.get(article, column.path)} (${getAcronym(
                      _.get(article, column.path)
                    )})`
                  : _.get(article, column.path)}
              </td>
            ) : (
              <td key={column.key}>{column.content(article)}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
