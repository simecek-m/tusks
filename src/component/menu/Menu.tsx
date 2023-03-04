import MenuList from "component/menu/MenuList";
import MenuListItem from "component/menu/MenuListItem";
import { useClickOutside } from "hook/clickOutside";
import { FC, useState } from "react";
import { IMenuListItem } from "type";

interface MenuProps {
  children: React.ReactNode;
  items: IMenuListItem[];
}

const Menu: FC<MenuProps> = ({ children, items }) => {
  const onClickOutside = () => setOpen(false);

  const [isOpen, setOpen] = useState<boolean>(false);
  const ref = useClickOutside(onClickOutside, isOpen);

  return (
    <div className="relative flex" ref={ref}>
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
