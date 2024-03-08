type Props = {
  label: string;
  onClick?: () => void;
  extraClasses?: string;
};

const FlatGreenButton = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`${props.extraClasses} w-full p-4 rounded-lg bg-green text-white`}
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
