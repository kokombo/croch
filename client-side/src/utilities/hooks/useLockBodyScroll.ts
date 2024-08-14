import { useEffect } from "react";

export const useLockBodyScroll = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      const scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [isModalOpen]);
};
