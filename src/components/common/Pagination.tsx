import { range } from "@utils";

interface Props {
  totalCount: number;
  pageSize: number;
  selectedPage: number;
  onPageSelect(page: number): void;
}

function Pagination({
  pageSize,
  totalCount,
  selectedPage,
  onPageSelect,
}: Props) {
  const pageCount = Math.ceil(totalCount / pageSize);
  const pages = range(1, pageCount);

  if (pageCount === 1) return null;
  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li
          key={page}
          onClick={() => onPageSelect(page)}
          className={`page-item ${page === selectedPage ? "active" : ""}`}
        >
          <a className="page-link" href="#">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
