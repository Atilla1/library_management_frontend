import { Link } from "react-router-dom";
import { Category } from "../types";

interface Props {
  items: Category[];
  selectedItem: Category;
  onItemSelect(category: Category): void;
}

function ListGroup({ items, selectedItem, onItemSelect }: Props) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`list-group-item${
            item.id === selectedItem.id ? " active" : ""
          } `}
        >
          {item.id ? (
            <Link
              className="text-black"
              onClick={() => console.log(item.id)}
              to={`/categories/${item.id}`}
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-black">{item.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
