import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AVAILABLE_ICONS from "constants/icons";
import "page/NewListPage.sass";

export default function NewListPage() {
  return (
    <div className="page-layout-new-list">
      <h1>Icon</h1>
      <div className="icon-picker">
        {AVAILABLE_ICONS.map((icon, index) => (
          <FontAwesomeIcon icon={icon} className="icon" key={index} />
        ))}
      </div>
    </div>
  );
}
