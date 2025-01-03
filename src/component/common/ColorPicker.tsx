import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "component/button/Button";
import { Input } from "component/form/Input";
import { Constant } from "constant";
import { motion, useDragControls } from "framer-motion";
import {
  calculateHueFromElements,
  calculateHueSliderPositionInPx,
  calculateSaturationAndValueFromElements,
  calculateSaturationSliderPositionInPx,
  hexToHsv,
  hsvToHex,
  hsvToHslString,
  Position,
} from "helper/color";
import { useToast } from "provider/ToastProvider";
import { FC, useCallback, useEffect, useRef, useState } from "react";

interface ColorPickerProps {
  onConfirm: (hex: string) => void;
  defaultColor?: string;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  onConfirm,
  defaultColor,
}) => {
  const defaultHsv = hexToHsv(defaultColor);
  const hueBarRef = useRef<HTMLDivElement | null>(null);
  const hueSliderRef = useRef<HTMLDivElement | null>(null);
  const hueSliderControls = useDragControls();

  const saturationAndValueAreaRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderControls = useDragControls();

  const [hue, setHue] = useState<number>(defaultHsv.h);
  const [saturation, setSaturation] = useState<number>(defaultHsv.s);
  const [value, setValue] = useState<number>(defaultHsv.v);

  const [hex, setHex] = useState<string>(hsvToHex(hue, saturation, value));

  const { toast } = useToast();

  useEffect(() => {
    setHex(hsvToHex(hue, saturation, value));
  }, [hue, saturation, value]);

  const hueChangeListener = useCallback(() => {
    const bar = hueBarRef.current;
    const slider = hueSliderRef.current;
    if (slider && bar) {
      const hue = calculateHueFromElements(bar, slider);
      setHue(hue);
    } else {
      console.error("Hue bar or slider could NOT be found!");
    }
  }, []);

  const saturationAndVaulueChangeListener = useCallback(() => {
    const area = saturationAndValueAreaRef.current;
    const slider = saturationAndValueSliderRef.current;
    if (area && slider) {
      const { saturation, value } = calculateSaturationAndValueFromElements(
        area,
        slider
      );
      setSaturation(saturation);
      setValue(value);
    } else {
      console.error("Saturation and value area or slider could NOT be found!");
    }
  }, []);

  const [initialHueSliderX, setInitialHueSliderX] = useState<number | null>(
    null
  );

  const [initialSaturationSlider, setInitialSaturationSlider] =
    useState<Position>();

  useEffect(() => {
    setInitialHueSliderX(
      calculateHueSliderPositionInPx(
        hueBarRef.current,
        hueSliderRef.current,
        hue
      )
    );
  }, [hueBarRef, hueSliderRef]);

  useEffect(() => {
    const result = calculateSaturationSliderPositionInPx(
      saturation,
      value,
      saturationAndValueAreaRef.current,
      saturationAndValueSliderRef.current
    );
    setInitialSaturationSlider(result);
  }, [saturationAndValueAreaRef]);

  const hueAreaDragConstraint = {
    top: hueBarRef.current?.clientTop,
    bottom: hueBarRef.current?.clientTop,
    left:
      (hueBarRef.current?.clientLeft ?? 0) -
      (hueSliderRef.current?.getBoundingClientRect().width ?? 0) / 2,
    right:
      (hueBarRef.current?.clientLeft ?? 0) +
      (hueBarRef.current?.clientWidth ?? 0) -
      (hueSliderRef.current?.getBoundingClientRect().width ?? 0) / 2,
  };

  const saturationAndValueAreaDragConstraint = {
    top:
      -(
        saturationAndValueSliderRef.current?.getBoundingClientRect().height ?? 0
      ) / 2,
    bottom:
      (saturationAndValueAreaRef.current?.getBoundingClientRect().height ?? 0) -
      (saturationAndValueSliderRef.current?.getBoundingClientRect().height ??
        0) /
        2,
    left:
      -(
        saturationAndValueSliderRef.current?.getBoundingClientRect().width ?? 0
      ) / 2,
    right:
      (saturationAndValueAreaRef.current?.clientWidth ?? 0) -
      (saturationAndValueSliderRef.current?.getBoundingClientRect().width ??
        0) /
        2,
  };

  const copyHexToClipboard = () => {
    navigator.clipboard.writeText(hex);
    toast({
      icon: "clipboard",
      title: "Clipboard",
      description: "Color has been copied!",
      type: "success",
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-bold">Pick a color</h1>
      <div className="flex flex-col">
        <div
          className="flex h-5 w-full cursor-pointer items-center"
          ref={hueBarRef}
          style={{
            background:
              "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))",
          }}
          onPointerDown={(event) => {
            hueSliderControls.start(event, { snapToCursor: true });
            (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
            addEventListener("pointermove", hueChangeListener);
          }}
          onPointerUp={(event) => {
            (event.target as HTMLDivElement).releasePointerCapture(
              event.pointerId
            );
            hueChangeListener();
            removeEventListener("pointermove", hueChangeListener);
          }}
        >
          <motion.div
            className="h-7 w-4 border-4 border-black dark:border-white"
            style={{
              background: `hsl(${hue} 100% 50%)`,
              x: initialHueSliderX ?? 0,
            }}
            ref={hueSliderRef}
            drag="x"
            dragConstraints={hueAreaDragConstraint}
            dragControls={hueSliderControls}
            dragMomentum={false}
            dragElastic={0}
          />
        </div>
        <div
          ref={saturationAndValueAreaRef}
          className="relative mt-4 h-64 w-full overflow-visible"
          style={{ background: `hsl(${hue} 100% 50%)` }}
          onPointerDown={(event) => {
            saturationAndValueSliderControls.start(event, {
              snapToCursor: true,
            });
            (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
            addEventListener("pointermove", saturationAndVaulueChangeListener);
          }}
          onPointerUp={(event) => {
            (event.target as HTMLDivElement).releasePointerCapture(
              event.pointerId
            );
            saturationAndVaulueChangeListener();
            removeEventListener(
              "pointermove",
              saturationAndVaulueChangeListener
            );
          }}
        >
          <div className="absolute h-full w-full bg-gradient-to-r from-white to-transparent" />
          <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent" />
          <motion.div
            className="h-5 w-5 border-4 border-black dark:border-white"
            style={{
              x: initialSaturationSlider?.x ?? 0,
              y: initialSaturationSlider?.y ?? 0,
              backgroundColor: hsvToHslString({
                h: hue,
                s: saturation,
                v: value,
              }),
            }}
            ref={saturationAndValueSliderRef}
            drag={true}
            dragConstraints={saturationAndValueAreaDragConstraint}
            dragControls={saturationAndValueSliderControls}
            dragMomentum={false}
            dragElastic={0}
          />
        </div>
        <div className="mt-4 flex flex-row gap-2">
          <div className="flex w-14" style={{ background: hex }} />
          <Input
            value={hex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHex(e.target.value)
            }
            readOnly
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
        isDisabled={!RegExp(Constant.Regex.Hex).test(hex)}
        hoverIcon="palette"
        onClick={() => onConfirm(hex)}
      >
        Pick
      </Button>
    </div>
  );
};
