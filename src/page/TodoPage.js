import PageWithHeader from "component/layout/PageWithHeader";
import "page/TodoPage.sass";
import List from "component/todo/List";
import {
  faCode,
  faShoppingBasket,
  faCoins
} from "@fortawesome/free-solid-svg-icons";

export default function ListPage() {
  return (
    <PageWithHeader>
      <div className="lists-layout">
        <ListPanel>
          <List name="Work" icon={faCode} />
          <List name="Shopping" icon={faShoppingBasket} />
          <List name="Finance" icon={faCoins} />
        </ListPanel>
      </div>
    </PageWithHeader>
  );
}

function ListPanel({ children }) {
  return <div className="list-panel">{children}</div>;
}
