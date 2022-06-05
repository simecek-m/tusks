import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "component/form/Input";
import FlexibleContent from "component/layout/FlexibleContent";
import styles from "page/NewListPage.module.sass";

export default function NewListPage() {
  return (
    <FlexibleContent flexDirection="column">
      <FontAwesomeIcon icon="rocket" />
      <h1>Icon</h1>
      <div id={styles["icon-picker"]}>
        <Input label="name" icon="a" />
      </div>
    </FlexibleContent>
  );
}
