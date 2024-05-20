import { twMerge } from "tailwind-merge";

type Props = {
  hidden?: boolean;
  onClick?: (e: any) => void;
  label: string | React.JSX.Element;
  extraClasses?: string;
  arialabel: string;
};

const RoundIconButton = (props: Props) => {
  return (
    <button
      hidden={props.hidden}
      type="button"
      className={twMerge(
        props.extraClasses,
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
