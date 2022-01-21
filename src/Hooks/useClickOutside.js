import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  let elementRef = useRef();

  useEffect(() => {
    let maybeHandler = (e) => {
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return elementRef;
};
