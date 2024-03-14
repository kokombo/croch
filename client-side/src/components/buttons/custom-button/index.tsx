type Props = {
  label: string;
  onClick?: (e: any) => void;
  extraClasses?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
};

const CustomButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${props.extraClasses} rounded-lg text-base font-bold `}
    >
      {props.label}
    </button>
  );
};

export default CustomButton;
