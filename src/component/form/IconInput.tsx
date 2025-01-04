import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "component/common/Modal";
import { IconPicker } from "component/icon/IconPicker";
import { IconType } from "constant/icons";
import { cn } from "helper/style";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IconInputProps {
  name: string;
  defaultIcon?: IconType;
}

export const IconInput = ({ name, defaultIcon = "icons" }: IconInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [icon, setIcon] = useState<IconType>(defaultIcon);
  const { register } = useFormContext();

  return (
    <div className="w-fit">
      <input {...register(name)} defaultValue={defaultIcon} readOnly hidden />
      <div>icon</div>
      <div
        className={cn(
          "flex h-14 w-14 cursor-pointer items-center justify-center bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
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
