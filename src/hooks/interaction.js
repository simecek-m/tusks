import { useCallback } from "react";

export function useClickOutside(ref, onClickOutside) {
  const clickHandler = useCallback(
    (e) => {
      // TODO: remove debug logging
      console.warn("click outside event");
      if (ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    },
    [ref, onClickOutside]
  );

  const addClickOutsideEvent = useCallback(() => {
    // TODO: remove debug logging
    console.log("add click outside event");
    document.addEventListener("click", clickHandler);
  }, [clickHandler]);

  const removeClickOutsideEvent = useCallback(
    (e) => {
      // TODO: remove debug logging
      console.log("remove click outside event");
      document.removeEventListener("click", clickHandler);
    },
    [clickHandler]
  );

  return {
    addClickOutsideEvent,
    removeClickOutsideEvent,
  };
}

export function useKeyPress(key, onKeyPressed) {
  const onKeyDown = useCallback(
    (e) => {
      // TODO: remove debug logging
      e.stopPropagation();
      console.warn(`${key} pressed event`);
      if (e.key === key) {
        onKeyPressed();
      }
    },
    [key, onKeyPressed]
  );

  const addOnKeyDownEvent = useCallback(() => {
    // TODO: remove debug logging
    console.log(`add ${key} press event`);
    document.addEventListener("keydown", onKeyDown);
  }, [onKeyDown, key]);

  const removeOnKeyDownEvent = useCallback(() => {
    // TODO: remove debug logging
    console.log(`remove ${key} press event`);
    document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown, key]);

  return {
    addOnKeyDownEvent,
    removeOnKeyDownEvent,
  };
}
