import { motion, useDragControls } from "framer-motion";
import {
  calculateSaturationAndValueFromElements,
  calculateSaturationSliderPositionInPx,
  Position,
} from "helper/color";
import { FC, useCallback, useEffect, useRef, useState } from "react";

type SaturationAndValuePickerProps = {
  hex: string;
  hue: number;
  saturation: number;
  value: number;
  onSaturationChange: (saturation: number) => void;
  onValueChange: (value: number) => void;
  hexInputManuallyChanged: number;
};

export const SaturationAndValuePicker: FC<SaturationAndValuePickerProps> = ({
  hex,
  hue,
  saturation,
  value,
  onSaturationChange,
  onValueChange,
  hexInputManuallyChanged,
}) => {
  const saturationAndValueAreaRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderRef = useRef<HTMLDivElement | null>(null);
  const saturationAndValueSliderControls = useDragControls();

  const saturationAndVaulueChangeListener = useCallback(() => {
    const area = saturationAndValueAreaRef.current;
    const slider = saturationAndValueSliderRef.current;
    if (area && slider) {
      const { saturation, value } = calculateSaturationAndValueFromElements(
        area,
        slider
      );
      onSaturationChange(saturation);
      onValueChange(value);
    } else {
      console.error("Saturation and value area or slider could NOT be found!");
    }
  }, []);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

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

  useEffect(() => {
    const result = calculateSaturationSliderPositionInPx(
      saturation,
      value,
      saturationAndValueAreaRef.current,
      saturationAndValueSliderRef.current
    );
    setPosition(result);
  }, [saturationAndValueAreaRef, hexInputManuallyChanged]);

  return (
    <div
      ref={saturationAndValueAreaRef}
      className="relative mt-6 h-64 w-full overflow-visible rounded-lg "
      style={{ background: `hsl(${hue} 100% 50%)` }}
      onPointerDown={(event) => {
        saturationAndValueSliderControls.start(event, {
          snapToCursor: true,
        });
        (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
        addEventListener("pointermove", saturationAndVaulueChangeListener);
      }}
      onPointerUp={(event) => {
        (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
        saturationAndVaulueChangeListener();
        removeEventListener("pointermove", saturationAndVaulueChangeListener);
      }}
    >
      <div className="absolute h-full w-full rounded-lg bg-gradient-to-r from-white to-transparent" />
      <div className="absolute h-full w-full rounded-lg bg-gradient-to-t from-black to-transparent " />
      <motion.div
        className="h-7 w-7 rounded-full border-4 border-black dark:border-white"
        style={{
          backgroundColor: hex,
        }}
        ref={saturationAndValueSliderRef}
        drag={true}
        dragConstraints={saturationAndValueAreaDragConstraint}
        dragControls={saturationAndValueSliderControls}
        dragMomentum={false}
        dragElastic={0}
        animate={{ x: position.x, y: position.y }}
      />
    </div>
  );
};
