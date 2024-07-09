import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  hidden?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string | React.JSX.Element;
  className?: string;
  arialabel: string;
};

const RoundIconButton = (props: Props) => {
  return (
    <button
      hidden={props.hidden}
      type="button"
      className={twMerge(
        props.className,
        "flex items-center justify-center rounded-full h-8 w-8 text-[10px] hover:scale-110 transition-transform duration-300 ease-in-out"
      )}
      onClick={props.onClick}
      aria-label={props.arialabel}
    >
      {props.label}
    </button>
  );
};

export default RoundIconButton;
