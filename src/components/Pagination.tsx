interface Props {
  totalCount: number;
  pageSize: number;
}

export default function Pagination({ pageSize, totalCount }: Props) {
  const pageCount = Math.ceil(totalCount / pageSize);

  let pages: number[] = [];

  for (let count = 1; count <= pageCount; count++) {
    pages.push(count);
  }
  if (pageCount === 1) return null;
  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li className="page-item">
          <a className="page-link" href="#">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
}
