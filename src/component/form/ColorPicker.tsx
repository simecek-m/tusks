import { motion, useDragControls } from "framer-motion";
import {
  calculateHueFromElements,
  calculateSaturationAndValueFromElements,
  hsvToHex,
} from "helper/color";
import { FC, useCallback, useEffect, useRef, useState } from "react";

interface ColorPickerProps {
  onConfirm: (hex: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ onConfirm }) => {
  const hueBarRef = useRef<HTMLDivElement | null>(null);
  const hueSliderRef = useRef<HTMLDivElement | null>(null);
  const hueSliderControls = useDragControls();

  const saturationAndValueAreaRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderControls = useDragControls();

  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(100);
  const [value, setValue] = useState<number>(100);

  const [hex, setHex] = useState<string>(hsvToHex(hue, saturation, value));

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

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div
        className="flex h-6 w-full cursor-pointer items-center rounded-xl"
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
          ref={hueSliderRef}
          drag="x"
          dragConstraints={hueBarRef}
          dragControls={hueSliderControls}
          dragMomentum={false}
          dragElastic={0}
          className="h-5 w-5 rounded-full border-4 border-white"
        />
      </div>
      <div
        ref={saturationAndValueAreaRef}
        className="relative h-full w-full overflow-hidden rounded-xl"
        style={{ background: `hsl(${hue} 100% 50%)` }}
        onPointerDown={(event) => {
          saturationAndValueSliderControls.start(event, { snapToCursor: true });
          (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
          addEventListener("pointermove", saturationAndVaulueChangeListener);
        }}
        onPointerUp={(event) => {
          (event.target as HTMLDivElement).releasePointerCapture(
            event.pointerId
          );
          saturationAndVaulueChangeListener();
          removeEventListener("pointermove", saturationAndVaulueChangeListener);
        }}
      >
        <div className="absolute h-full w-full bg-gradient-to-r from-white to-transparent" />
        <div className="absolute h-full w-full bg-gradient-to-t from-black to-transparent" />
        <motion.div
          drag
          ref={saturationAndValueSliderRef}
          dragConstraints={saturationAndValueAreaRef}
          dragControls={saturationAndValueSliderControls}
          dragMomentum={false}
          dragElastic={0}
          className="absolute top-0 right-0 h-5 w-5 rounded-full border-4 border-white"
        />
      </div>
      <div className="flex w-full flex-row gap-4">
        <div
          className="h-10 w-full rounded-full "
          style={{ background: hex }}
        />
        <button
          className="flex flex-row items-center justify-center gap-2 rounded-full bg-primary-700 px-4 py-2 font-semibold text-white dark:bg-primary-400 dark:text-black"
          onClick={() => onConfirm(hex)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
