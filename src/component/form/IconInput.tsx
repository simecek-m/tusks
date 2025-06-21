import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "component/common/Modal";
import { IconPicker } from "component/icon/IconPicker";
import { cn } from "helper/style";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IconInputProps {
  name: string;
  defaultIcon?: IconProp;
}

export const IconInput = ({ name, defaultIcon = "icons" }: IconInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [icon, setIcon] = useState<IconProp>(defaultIcon);
  const { register, setValue } = useFormContext();

  return (
    <div className="w-fit">
      <input
        {...register(name)}
        defaultValue={defaultIcon as string}
        readOnly
        hidden
      />
      <div>icon</div>
      <div
        className={cn(
          "flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white",
        )}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="h-auto w-80">
          <IconPicker
            onPick={(icon) => {
              setIcon(icon);
              setValue(name, icon);
              onClose();
            }}
            defaultIcon={icon}
            maxIcons={10}
          />
        </div>
      </Modal>
    </div>
  );
};
