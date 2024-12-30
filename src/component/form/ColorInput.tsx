import { ColorPicker } from "component/common/ColorPicker";
import { Modal } from "component/common/Modal";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ColorInputProps {
  label: string;
  name: string;
  defaultValue?: string;
}

export const ColorInput = ({
  label,
  name,
  defaultValue = "#adadad",
}: ColorInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [color, setColor] = useState<string>(defaultValue);
  const { register, setValue } = useFormContext();

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
          />
        </div>
      </Modal>
    </div>
  );
};
