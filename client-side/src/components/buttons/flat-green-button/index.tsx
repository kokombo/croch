import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  onClick?: any;
  extraClasses?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
};

const FlatGreenButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={twMerge(
        props.extraClasses,
        props.disabled ? "bg-grey cursor-not-allowed" : "bg-green",
        "text-white"
      )}
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
