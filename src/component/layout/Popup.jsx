import { useClickOutside, useKeyPress } from "hooks/interaction";
import { useEffect, useRef } from "react";

export default function Popup({ hide, children }) {
  const ref = useRef();
  const { addClickOutsideEvent, removeClickOutsideEvent } = useClickOutside(
    ref,
    hide
  );

  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Escape",
    hide
  );

  useEffect(() => {
    addClickOutsideEvent();
    addOnKeyDownEvent();
    return () => {
      removeClickOutsideEvent();
      removeOnKeyDownEvent();
    };
  }, [
    addClickOutsideEvent,
    addOnKeyDownEvent,
    removeClickOutsideEvent,
    removeOnKeyDownEvent,
  ]);

  return <div ref={ref}>{children}</div>;
}
