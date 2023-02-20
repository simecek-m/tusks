import { IconProp } from "@fortawesome/fontawesome-svg-core";
import MenuList from "component/menu/MenuList";
import MenuListItem from "component/menu/MenuListItem";
import { FC, useCallback, useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      setOpen(false);
    }
  }, []);

  // encapsulate to useClickOutside hook
  useEffect(() => {
    isOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [isOpen, handleClickOutside]);

  return (
    <div className="relative" ref={ref}>
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
