import { useEffect, SetStateAction, Dispatch } from "react";

export const useClearErrorMessage = (
  setState: Dispatch<SetStateAction<string>>
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setState("");
    }, 7000);

    return () => clearTimeout(timer);
  });
};
