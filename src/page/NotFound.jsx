import Button from "component/button/Button";
import styles from "page/NotFound.module.sass";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NotFundIllustration } from "assets/illustration/not-found.svg";

export default function NotFound() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div id={styles["not-found-page"]}>
      <div className={styles["horizontal-stack"]}>
        <div>
          <h1>Not Found</h1>
          <p>404</p>
          <Button icon="home" onClick={navigateHome}>
            home
          </Button>
        </div>
        <div>
          <NotFundIllustration
            id={styles["not-found-illustration"]}
            height="40vh"
          />
        </div>
      </div>
    </div>
  );
}
