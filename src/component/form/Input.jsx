import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { string, oneOf } from "prop-types";
import AVAILABLE_ICONS from "constants/icons";
import "component/form/Input.sass";

export default function Input({
  type = "text",
  icon,
  label,
  placeholder,
  defaultValue,
}) {
  return (
    <div>
      {label && <div className="label">{label}</div>}
      <div className="body">
        {icon && <FontAwesomeIcon icon={icon} size="xl" />}
        <input
          type={type}
          autoComplete="on"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
  type: oneOf([
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "range",
    "text",
    "time",
    "week",
  ]),
  icon: oneOf(AVAILABLE_ICONS),
  label: string,
  placeholder: string,
  defaultValue: string,
};
