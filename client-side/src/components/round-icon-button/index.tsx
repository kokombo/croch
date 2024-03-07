

type Props = {
  hidden?: boolean;
  onClick?: () => void;
  label: string | React.JSX.Element;
  extraClasses?: string;
  arialabel:string;
};

const RoundIconButton = (props: Props) => {
  return (
    <button
      hidden={props.hidden}
      type="button"
      className={`${props.extraClasses} flex items-center justify-center rounded-full h-6 w-6 text-[10px] hover:scale-110 transition-transform duration-300 ease-in-out`}
      onClick={props.onClick}
      aria-label= {props.arialabel}
    >
      {props.label}
    </button>
  );
};

export default RoundIconButton;
