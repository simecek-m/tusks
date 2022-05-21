import PageWithHeader from "component/layout/PageWithHeader";
import "page/TodoPage.sass";
import List from "component/todo/List";

export default function ListPage() {
  return (
    <PageWithHeader>
      <div className="lists-layout">
        <ListPanel>
          <List name="Testovací" />
          <List name="Work" icon="code" />
          <List name="Shopping" icon="shopping-basket" />
          <List name="Finance" icon="coins" />
        </ListPanel>
      </div>
    </PageWithHeader>
  );
}

function ListPanel({ children }) {
  return <div className="list-panel">{children}</div>;
}
