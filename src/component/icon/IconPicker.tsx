import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "component/button/Button";
import { Input } from "component/form/Input";
import { motion } from "motion/react";
import { cn } from "helper/style";
import React, { FC, useState } from "react";
import { fas } from "@fortawesome/free-solid-svg-icons";

type IconPickerProps = {
  defaultIcon?: IconProp;
  maxIcons?: number;
  onPick: (icon: IconProp) => void;
};

export const IconPicker: FC<IconPickerProps> = ({
  defaultIcon = "icons",
  maxIcons = 20,
  onPick,
}) => {
  const [search, setSearch] = useState<string>("");
  const [icon, setIcon] = useState<IconProp>(defaultIcon);
  const [isConfirmHovered, setIsConfirmHovered] = useState<boolean>(false);

  const AVAILABLE_ICONS: IconProp[] = Object.keys(fas).map(
    (key) => fas[key as keyof typeof fas],
  );

  const getIconName = (icon: IconProp): string | undefined => {
    if (typeof icon === "string") {
      return icon;
    }
    if (Array.isArray(icon)) {
      return icon[1];
    }
    if (typeof icon === "object" && icon !== null && "iconName" in icon) {
      return icon.iconName;
    }
    return undefined;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {icon && (
        <div className="flex w-fit flex-row gap-2">
          <div
            className={cn(
              "flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-gray-200 p-4 transition-all duration-500 ease-in-out dark:bg-gray-800",
              {
                "bg-brand-light dark:bg-brand-dark text-white dark:text-black":
                  isConfirmHovered,
              },
            )}
          >
            <FontAwesomeIcon icon={icon} size="2x" />
          </div>
          <Button
            icon="icons"
            hoverIcon="check"
            onClick={() => onPick(icon)}
            onHoverStart={() => setIsConfirmHovered(true)}
            onHoverEnd={() => setIsConfirmHovered(false)}
          >
            Confirm
          </Button>
        </div>
      )}
      <Input
        placeholder="what icon are you searching for?"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <div className="flex flex-row flex-wrap items-center justify-start gap-4">
        {AVAILABLE_ICONS.filter((icon) => getIconName(icon)?.includes(search))
          ?.slice(0, maxIcons)
          .map((iconName, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.3 }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-200 p-6 dark:bg-gray-800"
              onClick={() => setIcon(iconName)}
            >
              <FontAwesomeIcon icon={iconName} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};
