import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "component/todo/List.sass";
import { func } from "prop-types";
import { string } from "prop-types";

export default function List({ name, icon, onClick }) {
  return (
    <div className="list" onClick={onClick}>
      <div className="name">{name}</div>
      <FontAwesomeIcon className="icon" icon={icon} size="xl" />
    </div>
  );
}

List.propTypes = {
  name: string.isRequired,
  icon: string.isRequired,
  onClick: func.isRequired,
};
