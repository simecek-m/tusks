import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MenuList from "component/menu/MenuList";
import MenuListItem from "component/menu/MenuListItem";
import { FC, useState } from "react";

export interface IMenuListItem {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

interface MenuProps {
  children: React.ReactNode;
  items: IMenuListItem[];
}

const Menu: FC<MenuProps> = ({ children, items }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!isOpen)}>{children}</button>
      <MenuList visible={isOpen}>
        {items.map((item, index) => (
          <MenuListItem
            key={index}
            icon={item.icon}
            onClick={() => {
              item.onClick();
              setOpen(false);
            }}
          >
            {item.text}
          </MenuListItem>
        ))}
      </MenuList>
    </div>
  );
};

export default Menu;
