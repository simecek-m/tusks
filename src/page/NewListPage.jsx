import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconPicker from "component/form/IconPicker";
import Input from "component/form/Input";
import FlexibleContent from "component/layout/FlexibleContent";
import styles from "page/NewListPage.module.sass";

export default function NewListPage() {
  const pickIcon = (icon) => {
    console.log(icon);
  };
  return (
    <FlexibleContent flexDirection="column">
      <IconPicker onClick={(iconName) => pickIcon(iconName)} />
    </FlexibleContent>
  );
}
