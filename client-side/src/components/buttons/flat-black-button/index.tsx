type Props = {
  label: string;
  extraClasses?: string;
  onClick?: (e: any) => void;
};

const FlatBlackButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={`rounded-lg text-base font-bold  ${props.extraClasses}`}
    >
      {props.label}
    </button>
  );
};

export default FlatBlackButton;
