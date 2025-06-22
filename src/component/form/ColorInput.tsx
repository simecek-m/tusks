import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorPicker } from "component/colorPicker/ColorPicker";
import { Modal } from "component/common/Modal";
import { Constant } from "constant";
import { cn } from "helper/style";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ColorInputProps {
  name: string;
  type: "light" | "dark";
}

export const ColorInput = ({ name, type = "light" }: ColorInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [color, setColor] = useState<string>(
    type == "light" ? Constant.Color.Light : Constant.Color.Dark,
  );
  const { register, setValue, getValues } = useFormContext();

  return (
    <div className="w-fit">
      <input
        className="bg-gray-500 text-white"
        {...register(name)}
        defaultValue={color}
        readOnly
        hidden
      />
      <div
        className={cn(
          "flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg text-black",
          { "text-white": type === "light" },
        )}
        style={{ background: color }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        <FontAwesomeIcon icon={type === "light" ? "sun" : "moon"} size="lg" />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="h-auto w-80">
          <ColorPicker
            onConfirm={(hex) => {
              setColor(hex);
              setValue(name, hex);
              onClose();
            }}
            defaultColor={getValues(name)}
          />
        </div>
      </Modal>
    </div>
  );
};
