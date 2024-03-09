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
      className={`${props.extraClasses} w-full p-4 rounded-lg ${props.disabled ? "bg-grey" : "bg-green"} text-white`}
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
