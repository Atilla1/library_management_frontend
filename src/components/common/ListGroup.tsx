import { Category } from "../../types";

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
          key={item._id}
          onClick={() => onItemSelect(item)}
          className={`list-group-item ${
            item._id === selectedItem._id ? "active" : ""
          } `}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
