type Props = {
  label: string;
  onClick?: () => void;
  extraClasses?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
};

const CustomButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${props.extraClasses} py-4 px-10 rounded-lg `}
    >
      {props.label}
    </button>
  );
};

export default CustomButton;
