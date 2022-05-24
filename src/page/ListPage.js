import PageWithHeader from "component/layout/PageWithHeader";
import "page/ListPage.sass";
import List from "component/todo/List";

const LISTS = [
  {
    name: "Work",
    icon: "code",
  },
  {
    name: "Shopping",
    icon: "shopping-basket",
  },
  {
    name: "Finance",
    icon: "coins",
  },
];

export default function ListPage() {
  return (
    <PageWithHeader>
      <div className="lists-layout">
        <ListPanel>
          {LISTS.map((list, key) => (
            <List name={list.name} icon={list.icon} key={key} />
          ))}
        </ListPanel>
      </div>
    </PageWithHeader>
  );
}

function ListPanel({ children }) {
  return <div className="list-panel">{children}</div>;
}
