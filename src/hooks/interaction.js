import { useCallback } from "react";

export function useClickOutside(ref, onClickOutside) {
  const clickHandler = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    },
    [ref, onClickOutside]
  );

  const addClickOutsideEvent = useCallback(() => {
    document.addEventListener("click", clickHandler);
  }, [clickHandler]);

  const removeClickOutsideEvent = useCallback(() => {
    document.removeEventListener("click", clickHandler);
  }, [clickHandler]);

  return {
    addClickOutsideEvent,
    removeClickOutsideEvent,
  };
}

export function useKeyPress(key, onKeyPressed) {
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === key) {
        onKeyPressed();
      }
    },
    [key, onKeyPressed]
  );

  const addOnKeyDownEvent = useCallback(() => {
    document.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const removeOnKeyDownEvent = useCallback(() => {
    document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return {
    addOnKeyDownEvent,
    removeOnKeyDownEvent,
  };
}
