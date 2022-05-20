import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "component/todo/List.sass";

export default function List({ name, icon = faLock }) {
  return (
    <div className="list">
      <div className="name">{name}</div>
      <FontAwesomeIcon className="icon" icon={icon} size="xl" />
    </div>
  );
}
