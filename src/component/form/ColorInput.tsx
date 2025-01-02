import { ColorPicker } from "component/common/ColorPicker";
import { Modal } from "component/common/Modal";
import { Constant } from "constant";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ColorInputProps {
  label: string;
  name: string;
  type: "light" | "dark";
}

export const ColorInput = ({
  label,
  name,
  type = "light",
}: ColorInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [color, setColor] = useState<string>(
    type == "light" ? Constant.Color.Light : Constant.Color.Dark
  );
  const { register, setValue, getValues } = useFormContext();

  return (
    <div className="w-full">
      <input
        className="bg-gray-500 text-white"
        {...register(name)}
        defaultValue={color}
        readOnly
        hidden
      />
      <span>{label}</span>
      <div
        className="h-10 w-full cursor-pointer"
        style={{ background: color }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      />
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
