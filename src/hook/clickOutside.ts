import { Ref, useEffect, useRef } from "react";

export const useClickOutside = (
  callback: () => void,
  isElementVisible = true,
): Ref<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      callback();
    }
  };

  useEffect(() => {
    if (isElementVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isElementVisible]);

  return ref;
};
