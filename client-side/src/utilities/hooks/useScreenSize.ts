import { useState, useEffect } from "react";

const useScreenSize = () => {
  let initialState = 0;

  if (typeof window !== "undefined") {
    initialState = window.innerWidth;
  }

  const [screenSize, setScreeenSize] = useState(initialState);

  useEffect(() => {
    const handleResize = () => {
      setScreeenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { screenSize };
};

export default useScreenSize;
