type Props = {
  label: string;
  onClick?: any;
  extraClasses?: string;
  type: "submit" | "reset" | "button" | undefined;
};

const FlatGreenButton = (props: Props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${props.extraClasses} w-full p-4 rounded-lg bg-green text-white`}
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
