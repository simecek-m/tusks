import { useDragControls } from "framer-motion";
import {
  calculateHueFromElements,
  calculateHueSliderPositionInPx,
} from "helper/color";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type HuePickerProps = {
  hue: number;
  onHueChange: (hue: number) => void;
  hexInputManuallyChanged: number;
};

export const HuePicker: FC<HuePickerProps> = ({
  hue,
  onHueChange,
  hexInputManuallyChanged,
}) => {
  const hueBarRef = useRef<HTMLDivElement | null>(null);
  const hueSliderRef = useRef<HTMLDivElement | null>(null);
  const hueSliderControls = useDragControls();

  const [positionX, setPositionX] = useState<number>(0);

  useEffect(() => {
    const x = calculateHueSliderPositionInPx(
      hueBarRef.current,
      hueSliderRef.current,
      hue
    );
    setPositionX(x);
  }, [hueBarRef, hueSliderRef, hexInputManuallyChanged]);

  const hueChangeListener = useCallback(() => {
    const bar = hueBarRef.current;
    const slider = hueSliderRef.current;
    if (slider && bar) {
      const hue = calculateHueFromElements(bar, slider);
      onHueChange(hue);
    } else {
      console.error("Hue bar or slider could NOT be found!");
    }
  }, []);

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

  return (
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
        (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
        hueChangeListener();
        removeEventListener("pointermove", hueChangeListener);
      }}
    >
      <motion.div
        className="h-7 w-5 border-4 border-black dark:border-white"
        style={{
          background: `hsl(${hue} 100% 50%)`,
        }}
        ref={hueSliderRef}
        drag="x"
        dragConstraints={hueAreaDragConstraint}
        dragControls={hueSliderControls}
        dragMomentum={false}
        dragElastic={0}
        animate={{ x: positionX }}
      />
    </div>
  );
};
