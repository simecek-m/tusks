import Button from "component/button/Button";
import styles from "page/NotFound.module.sass";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div id={styles["not-found-page"]}>
      <div>Not Found</div>
      <div>404</div>
      <Button icon="home" onClick={navigateHome}>
        home
      </Button>
    </div>
  );
}
