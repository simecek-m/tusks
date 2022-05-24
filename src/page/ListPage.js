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
    <div className="lists-layout">
      <ListPanel>
        {LISTS.map((list, key) => (
          <List name={list.name} icon={list.icon} key={key} />
        ))}
      </ListPanel>
    </div>
  );
}

function ListPanel({ children }) {
  return <div className="list-panel">{children}</div>;
}
