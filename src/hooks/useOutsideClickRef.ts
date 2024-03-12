/* eslint-disable react-hooks/exhaustive-deps */
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";

/**
 * Hook for observing if a click happened outside of a particular element. Very useful for closing Modals or other pop-up/popover boxes with a click outside of it, instead of only when clicking on the Close icon.
 * @param setIsOpen - State setter for the Modal boolean.
 */
export default function useOutsideClickRef({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!ref?.current?.contains(event.target as HTMLDivElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [ref]);

  return ref;
}
