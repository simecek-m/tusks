import ColorPicker from "component/common/ColorPicker";
import Modal from "component/modal/Modal";
import { useModal } from "hook/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ColorInputProps {
  label: string;
  name: string;
  defaultValue?: string;
}

const ColorInput = ({
  label,
  name,
  defaultValue = "#ffffff",
}: ColorInputProps) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [color, setColor] = useState<string>(defaultValue);
  const { register, setValue } = useFormContext();

  return (
    <div>
      <input
        className="bg-gray-700 text-white"
        {...register(name)}
        defaultValue={color}
        readOnly
        hidden
      />
      <span>{label}</span>
      <div
        className="h-10 w-10 cursor-pointer rounded-full"
        style={{ background: color }}
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="h-80 w-80">
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

export default ColorInput;
