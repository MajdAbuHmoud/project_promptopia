"use client";

import { useState, useEffect, useCallback } from "react";

export function useResizeOnce() {
  const [hasResized, setHasResized] = useState(false);

  const handleResize = useCallback(() => {
    if (!hasResized) {
      // Do something on first resize
      console.log("Window has been resized for the first time!");
      setHasResized(true);
    }
  }, [hasResized]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return hasResized;
}
