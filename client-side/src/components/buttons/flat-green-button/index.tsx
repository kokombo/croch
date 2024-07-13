import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  onClick?: () => void;
  className?: string;
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
        props.className,
        "disabled:bg-grey disabled:cursor-not-allowed transition bg-green w-full p-4 rounded-lg text-white font-medium"
      )}
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
