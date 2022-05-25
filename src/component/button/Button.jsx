import { func } from "prop-types";
import "component/button/Button.sass";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: func.isRequired,
};
