import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "component/button/Button";
import { HuePicker } from "component/colorPicker/HuePicker";
import { SaturationAndValuePicker } from "component/colorPicker/SaturationAndValuePicker";
import { Input } from "component/form/Input";
import { Constant } from "constant";
import { hexToHsv, HSV, hsvToHex } from "helper/color";
import { useToast } from "provider/ToastProvider";
import { FC, useEffect, useState } from "react";

type Color = {
  hex: string;
  hsv: HSV;
};

interface ColorPickerProps {
  onConfirm: (hex: string) => void;
  defaultColor?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  onConfirm,
  defaultColor = "#ace31e",
}) => {
  const { toast } = useToast();
  const defaultHsv = hexToHsv(defaultColor);

  const [color, setColor] = useState<Color>({
    hex: defaultColor,
    hsv: {
      hue: defaultHsv.hue,
      saturation: defaultHsv.saturation,
      value: defaultHsv.value,
    },
  });

  // variable determinating hue, saturation and values sliders should recalculate positions because hex input was manually changed
  const [hexInputManuallyChanged, setHexInputManuallyChanged] =
    useState<number>(0);

  const copyHexToClipboard = () => {
    navigator.clipboard.writeText(color.hex);
    toast({
      icon: "clipboard",
      title: "Clipboard",
      description: "Color has been copied!",
      type: "success",
    });
  };

  useEffect(() => {
    setColor((color) => ({
      ...color,
      hex: hsvToHex(color.hsv.hue, color.hsv.saturation, color.hsv.value),
    }));
  }, [color.hsv]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-bold">Pick a color</h1>
      <div className="flex flex-col">
        <HuePicker
          hue={color.hsv.hue}
          hexInputManuallyChanged={hexInputManuallyChanged}
          onHueChange={(hue) => {
            setColor((color) => ({
              ...color,
              hsv: { ...color.hsv, hue },
            }));
          }}
        />
        <SaturationAndValuePicker
          hue={color.hsv.hue}
          saturation={color.hsv.saturation}
          value={color.hsv.value}
          onSaturationChange={(saturation) => {
            setColor((color) => ({
              ...color,
              hsv: { ...color.hsv, saturation },
            }));
          }}
          onValueChange={(value) => {
            setColor((color) => ({ ...color, hsv: { ...color.hsv, value } }));
          }}
          hex={color.hex}
          hexInputManuallyChanged={hexInputManuallyChanged}
        />
        <div className="mt-4 flex flex-row gap-2">
          <div className="flex w-14" style={{ background: color.hex }} />
          <Input
            value={color.hex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const hex = e.target.value;
              if (RegExp(Constant.Regex.Hex).test(hex)) {
                const hsv = hexToHsv(hex);
                setColor({
                  hex,
                  hsv: {
                    hue: hsv.hue,
                    saturation: hsv.saturation,
                    value: hsv.value,
                  },
                });
                setHexInputManuallyChanged(Date.now());
              } else {
                setColor((color) => ({ ...color, hex }));
              }
            }}
          />
          <div
            className="flex w-14 cursor-pointer items-center justify-center bg-gray-200 p-2 dark:bg-gray-800"
            onClick={copyHexToClipboard}
          >
            <FontAwesomeIcon icon="copy" />
          </div>
        </div>
      </div>
      <Button
        icon="check"
        isDisabled={!RegExp(Constant.Regex.Hex).test(color.hex)}
        hoverIcon="palette"
        onClick={() => onConfirm(color.hex)}
      >
        Pick
      </Button>
    </div>
  );
};
