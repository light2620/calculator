import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    // Set the initial value
    setIsMobile(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
