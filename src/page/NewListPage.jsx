import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "component/form/Input";
import styles from "page/NewListPage.module.sass";

export default function NewListPage() {
  return (
    <div id={styles.layout}>
      <FontAwesomeIcon icon="rocket" />
      <h1>Icon</h1>
      <div id={styles["icon-picker"]}>
        <Input label="name" icon="a" />
      </div>
    </div>
  );
}
