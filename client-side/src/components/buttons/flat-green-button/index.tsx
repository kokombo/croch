type Props = {
  label: string;
  onClick: () => void;
};

const FlatGreenButton = (props: Props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="w-full p-4 rounded-lg bg-green text-white"
    >
      {props.label}
    </button>
  );
};

export default FlatGreenButton;
