import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "component/todo/List.sass";

export default function List({ name, icon = "list-check" }) {
  return (
    <div className="list">
      <div className="name">{name}</div>
      <FontAwesomeIcon className="icon" icon={icon} size="xl" />
    </div>
  );
}
